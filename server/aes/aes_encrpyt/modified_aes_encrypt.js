import { ModifiedModSub } from "../aes_decrypt/aes_decrypt_methods/modified_mod_sub";
import { AddRoundKey } from "./aes_encrypt_methods/add_round_key";
import { MixColumns } from "./aes_encrypt_methods/mix_columns";
import { ModifiedModAdd } from "./aes_encrypt_methods/modified_mod_add";
import { ShiftRows } from "./aes_encrypt_methods/shift_rows";
import { SubBytes } from "./aes_encrypt_methods/sub_bytes";
import calculateCorrelation from "calculate-correlation";

export function ModifiedAESEncrypt(text, key) {
  let inputText = String(text).match(/.{1,2}/g);
  let hexText = [];

  // Converting string to hexadecimal | ae -> 0xae
  for (let i = 0; i < inputText.length; i++) {
    const numericValue = parseInt("0x" + inputText[i], 16);
    hexText.push("0x" + numericValue.toString(16));
  }

  // Grouping the text input to create a 4 by 4 state matrix
  function createGroups(arr, numGroups) {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
      .fill("")
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }

  let state = createGroups(hexText, 4); // creating a 4 by 4 state matrix from text input
  let flipState = flipHexBit(createGroups(hexText, 4));
  let keys = createGroups(key, 30); // grouping the keys per round (round 0 to 10 | total of 11 rounds)
  let keyCounter = 0;

  // Start of the Encryption Algorithm
  for (let i = 0; i <= 10; i++) {
    if (i === 0) {
      // round 0 initial addroundkey
      state = AddRoundKey(state, keys[keyCounter]);
      flipState = AddRoundKey(flipState, keys[keyCounter]);
      keyCounter++;
    } else if (i === 10) {
      // round 10
      state = SubBytes(state);
      flipState = SubBytes(flipState);
      state = ModifiedModAdd(state, keys[keyCounter]);
      flipState = ModifiedModAdd(flipState, keys[keyCounter]);
      keyCounter++;
      state = ShiftRows(state);
      flipState = ShiftRows(flipState);
      state = AddRoundKey(state, keys[keyCounter]);
      flipState = AddRoundKey(flipState, keys[keyCounter]);
    } else {
      state = SubBytes(state);
      flipState = SubBytes(flipState);
      state = AddRoundKey(state, keys[keyCounter]);
      flipState = AddRoundKey(flipState, keys[keyCounter]);
      keyCounter++;
      state = ShiftRows(state);
      flipState = ShiftRows(flipState);
      state = ModifiedModAdd(state, keys[keyCounter]);
      flipState = ModifiedModAdd(flipState, keys[keyCounter]);
      keyCounter++;
      state = MixColumns(state);
      flipState = MixColumns(flipState);
      state = AddRoundKey(state, keys[keyCounter]);
      flipState = AddRoundKey(flipState, keys[keyCounter]);
      keyCounter++;
    }
  }

  // Extra step to ensure the output is in string
  let returningState = [];
  let returningFlipState = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      state[i][j] = parseInt(state[i][j]).toString(16).padStart(2, "0"); //removing 0x and ensuring trailing zeros are taken care
      returningState.push(state[i][j]);
      returningFlipState.push(state[i][j]);
    }
  }

  /* FOR CORRELATION COEFFICIENT  */
  /* -------------------------------------------------------------------------------- */
  console.log("Correlation Coefficient Test Results");
  let orig = createGroups(hexText, 4);
  let cipher = state;
  let pearsonValues = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      orig[i][j] = parseInt(orig[i][j], 16);
      cipher[i][j] = parseInt(cipher[i][j], 16);
    }
  }

  for (let i = 0; i < 4; i++) {
    const correlation = calculateCorrelation(orig[i], cipher[i]);
    pearsonValues.push(correlation);
  }

  let Negligible = 0;
  let Low = 0;
  let moderate = 0;
  let High = 0;
  let VeryHigh = 0;

  for (let i = 0; i < pearsonValues.length; i++) {
    if (pearsonValues[i] === 0) {
      Negligible++;
    } else if (
      (pearsonValues[i] > 0 && pearsonValues[i] <= 0.3) ||
      (pearsonValues[i] >= -0.3 && pearsonValues[i] < 0)
    ) {
      Low++;
    } else if (
      (pearsonValues[i] > 0.3 && pearsonValues[i] < 0.7) ||
      (pearsonValues[i] > -0.7 && pearsonValues[i] < -0.3)
    ) {
      moderate++;
    } else if (
      (pearsonValues[i] >= 0.7 && pearsonValues[i] < 1) ||
      (pearsonValues[i] > -1 && pearsonValues[i] <= -0.7)
    ) {
      High++;
    } else if (pearsonValues[i] === 1 || pearsonValues[i] === -1) {
      VeryHigh++;
    }
  }

  console.log("Negligible: ", Negligible);
  console.log("Low: ", Low);
  console.log("moderate: ", moderate);
  console.log("High: ", High);
  console.log("Very High: ", VeryHigh);

  /* FOR AVALANCHE TEST */
  /* -------------------------------------------------------------------------------- */
  let avalancheResult = 0;

  function flipHexBit(hexValue, bitPosition) {
    // Convert the hexadecimal value to binary
    let binaryString = parseInt(hexValue, 16).toString(2);

    // Pad the binary string with zeros to ensure it's 32 bits long
    binaryString = binaryString.padStart(32, "0");

    // Convert the binary string to an array of characters for easy manipulation
    let binaryArray = binaryString.split("");

    // Flip the bit at the specified position
    if (binaryArray[bitPosition] === "0") {
      binaryArray[bitPosition] = "1";
    } else {
      console.log(flipState);
      binaryArray[bitPosition] = "0";
    }

    // Convert the binary array back to a string
    binaryString = binaryArray.join("");

    // Convert the binary string back to hexadecimal
    let flippedHexValue = parseInt(binaryString, 2)
      .toString(16)
      .padStart(8, "0");

    return flippedHexValue;
  }

  for (let i = 0; i < 10; i++) {
    let avalancheKey1 = state;
    let avalancheKey2 = flipState;
    let avalancheKeys1 = [];
    let avalancheKeys2 = [];
    // Converting string to hexadecimal | ae -> 0xae
    for (let i = 0; i < avalancheKey1.length; i++) {
      const numericValue = parseInt("0x" + avalancheKey1[i], 16);
      avalancheKeys1.push("0x" + numericValue.toString(16));
    }
    // Converting string to hexadecimal | ae -> 0xae
    for (let i = 0; i < avalancheKey2.length; i++) {
      const numericValue = parseInt("0x" + avalancheKey2[i], 16);
      avalancheKeys2.push("0x" + numericValue.toString(16));
    }

    let expandedAva1 = createGroups(avalancheKeys1, 4);
    let expandedAva2 = createGroups(avalancheKeys2, 4);
    let bitDiff = xorState(expandedAva1, expandedAva2);
    bitDiff = combineHextoBin(bitDiff);
    let count = 0;
    for (let i = 0; i < bitDiff.length; i++) {
      if (bitDiff[i] === "1") {
        count++;
      }
    }
  }

  avalancheResult = (count / 128) * 100;
  console.log(`Avalanche Test Result: ${avalancheResult}%`);

  return returningState.join("");
}
