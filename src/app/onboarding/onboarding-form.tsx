"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { OnboardingSchema } from "@/schemas/onboarding";
import {
  generateClaim,
  generateClaimQrData,
  generatePolygonID,
} from "@/server/api/onboarding";
import { PolygonID } from "@/types/polygonId";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { devNull } from "os";
import * as React from "react";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { z } from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof OnboardingSchema>;

export function JoinForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [polygonIdData, setPolygonIdData] = React.useState<PolygonID | null>(
    null,
  );
  const [claimID, setClaimID] = React.useState<string>("");
  const [qrData, setQrData] = React.useState(devNull);

  const defaultValues = {
    name: "",
    email: "",
    pin: "",
    favCar: "",
    bestPlace: "",
    favGame: "",
  };

  const form = useForm<FormData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);

    const polygonIdData = await generatePolygonID();
    if (polygonIdData === null) {
      return;
    }
    setPolygonIdData(polygonIdData);

    const claimData = await generateClaim(
      data.pin,
      data.favCar,
      data.bestPlace,
      data.favGame,
      polygonIdData.id,
    );

    if (claimData === null) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    setClaimID(claimData.id);

    const qrData = await generateClaimQrData(claimData.id);
    if (qrData === null) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    setQrData(qrData);

    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      {qrData ? (
        <div className=" flex w-full flex-col items-center justify-center">
          <Card className="border-neutral-300 px-12 py-8">
            <h1
              className={`mb-5 text-center text-2xl font-semibold underline underline-offset-8`}
            >
              Scan QR To Claim
            </h1>
            <QRCode value={JSON.stringify(qrData)} />
          </Card>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="border-neutral-300 px-12 py-8">
              <div className="grid gap-8">
                <h1
                  className={`mb-3 text-center text-2xl font-semibold underline underline-offset-8`}
                >
                  Join InventtID
                </h1>
                <div className=" flex items-start justify-between gap-8">
                  <div className=" w-full space-y-3">
                    <div className=" relative flex items-center justify-center pt-3">
                      <Separator className=" w-3/12" />
                      <div className=" relative flex w-8/12 justify-center text-center text-xs uppercase">
                        <span className="bg-background text-muted-foreground px-2">
                          Fill your personal details
                        </span>
                      </div>
                      <Separator className=" w-3/12" />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Alice 👩🏻"
                                id="name"
                                type="text"
                                disabled={isLoading}
                                defaultValue={defaultValues?.name}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@inventtid.com 📩"
                                id="email"
                                type="email"
                                disabled={isLoading}
                                defaultValue={defaultValues?.email}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Security Pin</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Don't use 123456 please 🔒"
                                id="pin"
                                type="text"
                                disabled={isLoading}
                                defaultValue={defaultValues?.pin}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className=" w-full space-y-3">
                    <div className=" relative flex items-center justify-center pt-3">
                      <Separator className=" w-3/12" />
                      <div className=" relative flex w-8/12 justify-center text-center text-xs uppercase">
                        <span className="bg-background text-muted-foreground px-2">
                          Answer security questions
                        </span>
                      </div>
                      <Separator className=" w-3/12" />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="favCar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your favourite car</FormLabel>
                            <FormControl>
                              <Input
                                id="favCar"
                                placeholder="I like camero 🏎️"
                                type="text"
                                disabled={isLoading}
                                defaultValue={defaultValues?.favCar}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="bestPlace"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Best place you ever visited</FormLabel>
                            <FormControl>
                              <Input
                                id="bestPlace"
                                placeholder="I went to GOA 🚀"
                                type="text"
                                disabled={isLoading}
                                defaultValue={defaultValues?.bestPlace}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="favGame"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your favourite game character</FormLabel>
                            <FormControl>
                              <Input
                                id="favGame"
                                placeholder="I like hitman 🔫"
                                type="text"
                                disabled={isLoading}
                                defaultValue={defaultValues?.favGame}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Smart Account
                </Button>
              </div>
            </Card>
          </form>
        </Form>
      )}
    </div>
  );
}
