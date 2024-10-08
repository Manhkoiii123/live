# local tunnal

khi mà deploy với test ở local thì là 2 url khác nhau
=> fake 1 cái url bằng ngrok

sau khi đã kết nối với tài khoản thì nó có 1 cái key trên web này

https://dashboard.ngrok.com/get-started/setup/windows (1)

chạy dự án bằng npm run dev

sau đó vào cái terminal của ngork (tải về giải nén ở ổ D)

chạy terminal đó lên và chạy câu lệnh `ngrok http 3000`

fake được 1 cái url

vào trong (1) => thấy có cái menu chứa cái domain => đang có cái domain đuang dùng
chọn cái start tunnal => copy câu lệnh trên đó chạy trên terminla của ngrok

`ngrok http --domain=positive-moth-infinite.ngrok-free.app 3000  `

# Webhooks with clerk

docs
`https://clerk.com/docs/integrations/webhooks/sync-data`

vào dark board chọn webhooks => add endpoind

thêm cái này vào endpUrl `https://positive-moth-infinite.ngrok-free.app/api/webhooks/clerk`

đến cái subcribe to event chọn cái user => create update delete => chọn create

có cái `Signing Secret` => copy dán vào env

```TS
WEBHOOK_SECRET="whsec_t7rJ1uD3WumAhK2aygIIyh28lO3VVv9C"
```

làm theo docs ở đầu trang

sau khi đến cái đoạn copy code tại file route.ts => ok

sửa cái middleware.ts

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

file /api/webhooks/clerk/route.ts

```ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  //chèn vào db của mình
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.updated") {
    const currentUser = await db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      },
    });

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }
  return new Response("", { status: 200 });
}
```
