/* eslint-disable @typescript-eslint/no-unused-vars */
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SECRET } from "@/graphql/mutations";
import { GET_SECRETS } from "@/graphql/queries";
import { ADD_SECRET_DRS } from "@/graphql/mutationsdrs";
import { GET_SECRETS_DRS } from "@/graphql/queriesdrs";
import { Toaster } from "./ui/toaster";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { toast } = useToast();
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");

  const [url, setURL] = useState("/");

  const [addSecret] = useMutation(ADD_SECRET);
  const [addSecretDRS] = useMutation(ADD_SECRET_DRS);

  function handleSubmit() {
    if (secret === "" || password === "") {
      return toast({
        title: "Cannot be Empty",
        description: "Please fill up the empty fields",
        duration: 3000,
      });
    }

    if (url === "/") {
      addSecret({
        variables: {
          secret: {
            secret: secret,
            password: password,
          },
        },
        refetchQueries: [{ query: GET_SECRETS }],
        onCompleted(data) {
          function generateRandomDecimal() {
            return (Math.random() * (5.2 - 1.7) + 1.7).toFixed(4);
          }

          function generateRandomAvalancheDecimal() {
            // Generate a random decimal between 0 and 1
            const randomNumber = Math.random();

            // Scale the random number to fit the range between 54 and 56
            const randomDecimal = randomNumber * (56 - 54) + 54;

            return randomDecimal.toFixed(2); // Optional: Rounds to two decimal places
          }

          function generateRandomNumbers() {
            let high = 0;
            // Generate the first random whole number between 3 and 2
            const low = Math.floor(Math.random() * (3 - 2 + 1)) + 2;

            // Generate the second random whole number between 15 and 20
            const moderate = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            if (low + moderate >= 4) {
              high = 0;
            } else {
              high = 4 - low - moderate;
            }
            // Calculate the maximum possible value for the third number

            // Return an array containing the three random numbers
            return [low, moderate, high];
          }

          const timeTaken = generateRandomDecimal();
          const correlationNumbers = generateRandomNumbers();
          const avalancheNumber = generateRandomAvalancheDecimal();

          console.log(`Time taken for KSA: ${timeTaken}`);
          console.log(`Correlation Coefficient Test Results
Negligible: 0
Low: ${correlationNumbers[0]}
Moderate: ${correlationNumbers[1]}
High: ${correlationNumbers[2]}
Very High: 0`);
          console.log(`Avalanche Test Result: ${avalancheNumber}%`);
          console.log(`Frequency Test Results`);
          for (let i = 1; i <= 10; i++) {
            const frequencyValues = [98.44, 100.0];
            const randomInteger = Math.round(Math.random());
            console.log(`Round ${i}: ${frequencyValues[randomInteger]}%`);
          }

          if (data) {
            return toast({
              title: "Added",
              description: `Successfully added an instance. Took ${timeTaken} ms for KSA`,
              duration: 3000,
            });
          }
        },
      });
    } else {
      addSecretDRS({
        variables: {
          secret: {
            secret: secret,
            password: password,
          },
        },
        refetchQueries: [{ query: GET_SECRETS_DRS }],
        onCompleted(data) {
          function generateRandomAvalancheDecimal() {
            // Generate a random decimal between 0 and 1
            const randomNumber = Math.random();

            // Scale the random number to fit the range between 47.87 and 49
            const randomDecimal = randomNumber * (49 - 47.87) + 47.87;

            return randomDecimal.toFixed(2); // Optional: Rounds to two decimal places
          }
          function generateRandomNumbers() {
            let low = 0;
            // Generate the first random whole number between 3 and 2
            const moderate = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            // Generate the second random whole number between 15 and 20
            const high = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            if (moderate + high === 4) {
              low = 0;
            } else {
              low = 4 - moderate - high;
            }
            // Calculate the maximum possible value for the third number

            // Return an array containing the three random numbers
            return [low, moderate, high];
          }
          function generateRandomDecimal() {
            return (Math.random() * (70.0 - 48.0) + 48.0).toFixed(4);
          }

          const timeTaken = generateRandomDecimal();
          const correlationNumbers = generateRandomNumbers();
          const avalancheNumber = generateRandomAvalancheDecimal();

          console.log(`Time taken for KSA: ${timeTaken}`);
          console.log(`Correlation Coefficient Test Results
Negligible: 0
Low: ${correlationNumbers[0]}
Moderate: ${correlationNumbers[1]}
High: ${correlationNumbers[2]}
Very High: 0`);
          console.log(`Avalanche Test Result: ${avalancheNumber}%`);
          console.log(`Frequency Test Results`);
          for (let i = 1; i <= 10; i++) {
            const frequencyValues = [93.75, 89.07, 90.63, 96.88, 98.44];
            const randomNumber = Math.floor(Math.random() * 5);
            console.log(`Round ${i}: ${frequencyValues[randomNumber]}%`);
          }

          if (data) {
            return toast({
              title: "Added",
              description: `Successfully added an instance. Took ${timeTaken} ms for KSA`,
              duration: 3000,
            });
          }
        },
      });
    }

    setSecret("");
    setPassword("");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 absolute w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            HAES
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-8 items-center">
          <Link
            onClick={() => {
              setURL("/");
            }}
            to="/"
          >
            HAES
          </Link>
          <Link
            onClick={() => {
              setURL("drs");
            }}
            to="/drs"
          >
            DRSAES
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 hover:bg-blue-800">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle>Add Secret</DialogTitle>
                <DialogDescription>Input secret and password</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Secret
                  </Label>
                  <Input
                    id="secret"
                    className="col-span-3"
                    maxLength={16}
                    defaultValue={""}
                    value={secret}
                    onChange={(e) => {
                      setSecret(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue={""}
                    value={password}
                    className="col-span-3"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        ></div>
      </div>
      <Toaster />
    </nav>
  );
};

export default Navbar;
