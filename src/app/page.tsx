import controller from "@/assets/controller.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-8 space-y-6 ">
      <div className="flex items-center justify-between gap-8 py-8 ">
        <div className=" w-7/12 space-y-5">
          <h1 className="text-4xl font-bold tracking-wide">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h1>
          <p className=" text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            quo inventore deserunt
          </p>
          <div className=" space-x-3">
            <Button className=" ">Join InventtID</Button>
            <Button variant={"outline"} className=" ">
              Learn More
            </Button>
          </div>
        </div>
        <div className=" relative flex w-[410px] items-center justify-center">
          <div className="flex h-80 w-80 items-center justify-center rounded-full bg-violet-500 ring-0 "></div>
          <Image
            className="absolute top-0 z-40  w-full"
            src={controller}
            alt=""
          />
        </div>
      </div>
      <div className=" space-y-8">
        <div className=" space-y-3">
          <div className="flex items-center justify-between">
            <h2 className=" text-3xl font-semibold tracking-wide">Features</h2>
            <div className=" flex cursor-pointer items-center gap-2 underline-offset-2 hover:underline">
              Learn More <ArrowRight size={16} />
            </div>
          </div>
          <Separator />
        </div>

        <div className=" flex w-full items-center justify-between gap-8">
          <Card className=" w-4/12 space-y-3 p-4">
            <div className="text-2xl tracking-wide">Game</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              expedita aperiam molestiae minus impedit est dolorem assumenda a
            </div>
          </Card>
          <Card className=" w-4/12 space-y-3 p-4">
            <div className="text-2xl tracking-wide">Game</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              expedita aperiam molestiae minus impedit est dolorem assumenda a
            </div>
          </Card>
          <Card className=" w-4/12 space-y-3 p-4">
            <div className="text-2xl tracking-wide">Game</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              expedita aperiam molestiae minus impedit est dolorem assumenda a
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
