/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

import { GET_SECRET, GET_SECRETS } from "@/graphql/queries";
import { DELETE_SECRET } from "@/graphql/mutations";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";

const Hero = () => {
  const [pass, setPass] = useState("");
  const { data } = useQuery(GET_SECRETS); //why is this being affected by getsecret
  const [getSecret, { data: fetchedSecret }] = useLazyQuery(GET_SECRET);

  const [deleteSecret] = useMutation(DELETE_SECRET);

  function handleDelete(id: any) {
    deleteSecret({
      variables: { id: id },
      refetchQueries: [{ query: GET_SECRETS }],
      onCompleted(data) {
        if (data) {
          return toast({
            title: "Deleted",
            description: "Successfully deleted instance",
            duration: 3000,
          });
        }
      },
    });
  }

  async function handleReveal(id: any, password: any) {
    getSecret({
      variables: { id: id, password: password },
      onCompleted(data) {
        if (data) {
          setPass("");
        }
      },
    });
  }

  return (
    <section className="bg-white dark:bg-gray-900 pt-20 h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-4 lg:py-16 lg:grid-cols-12">
        {data?.secrets.map((item: any) => (
          <Card key={item.id} className="col-span-3">
            <CardHeader>
              <CardDescription>{item.secret}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex gap-4">
                <Drawer>
                  <DrawerTrigger>
                    <Button className="bg-blue-700 hover:bg-blue-800">
                      Open Secret
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Secret</DrawerTitle>
                        <DrawerDescription>
                          Input password to reveal secret
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <Input
                          onChange={(e) => {
                            setPass(e.target.value);
                          }}
                          placeholder="password"
                          type="password"
                        />
                      </div>
                      <DrawerFooter>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => {
                                handleReveal(item.id, pass);
                              }}
                              className="bg-blue-700 hover:bg-blue-800"
                            >
                              Reveal
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-center">
                                {fetchedSecret === undefined
                                  ? "Wrong password"
                                  : item.secret}
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction className="bg-blue-700 hover:bg-blue-800">
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-red-700 hover:bg-red-800">
                      Delete Secret
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your secret and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-700 hover:bg-red-800"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
    </section>
  );
};

export default Hero;
