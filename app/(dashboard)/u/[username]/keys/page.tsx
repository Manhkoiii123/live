import ConnectModal from "@/app/(dashboard)/u/[username]/keys/_components/ConnectModal";
import KeyCard from "@/app/(dashboard)/u/[username]/keys/_components/KeyCard";
import UrlCard from "@/app/(dashboard)/u/[username]/keys/_components/UrlCard";
import { Button } from "@/components/ui/button";
import { getSeft } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import React from "react";

const KeysPage = async () => {
  const self = await getSeft();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error("Stream not found");
  }
  return (
    <div className="text-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
