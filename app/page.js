import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src='/logo.svg'
          width={200}
          height={100}
        />
        <h1>Hi!!</h1>
        <Button>Button</Button>
      </div>
    </main>
  );
}
