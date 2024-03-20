import { xor } from "./aes_key_expansion_methods/xor";
import { xorRcon } from "./aes_key_expansion_methods/xor_rcon";
import { substituteRow } from "./aes_key_expansion_methods/row_sub_bytes";
import { rotWord } from "./aes_key_expansion_methods/rotate_word";
import { SubBytes } from "../aes_encrpyt/aes_encrypt_methods/sub_bytes";
import { ModifiedXorRcon } from "./aes_key_expansion_methods/modified_xor_rcon";
import { xorState } from "./aes_key_expansion_methods/xor_state";
import { allKey1, allKey2 } from "../constants";

export function ModifiedKeyExpansion(key) {
  const start = window.performance.now();

  let inputKey = String(key).match(/.{1,2}/g); // splitting input key per group of 2
  let hexKeys = [];

  // Converting string to hexadecimal | ae -> 0xae
  for (let i = 0; i < inputKey.length; i++) {
    const numericValue = parseInt("0x" + inputKey[i], 16);
    hexKeys.push("0x" + numericValue.toString(16));
  }

  // Grouping the hexadecimal keys firstly into 4 per word | creation of nesting
  function createGroups(arr, numGroups) {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
      .fill("")
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }

  let expandedKeys = createGroups(hexKeys, 4); // grouping keys by 4 (w0, w1, w2, w3, ...)

  // Start of Key Expansion

  // SOP 2 <---------------------------
  expandedKeys = SubBytes(expandedKeys);
  expandedKeys = ModifiedXorRcon(expandedKeys);

  //SOP 1 <---------------------------
  for (let i = 4; i < 120; i++) {
    let temp = [...expandedKeys[i - 1]]; // ...expandedKeys is spread to avoid referencing to one point. This is done to make new reference
    if (i % 4 === 0) {
      // this will only happen per multiple of 4 where the confusion diffusion is added
      //SOP 3 <---------------------------
      temp = xorRcon(substituteRow(rotWord(temp)), i / 4 - 1); // i / 4 - 1 to start with round 0. XOR with confusion and diffusion
    }
    expandedKeys[i] = xor(expandedKeys[i - 4], temp); // if not multiple of 4, will XOR past and current byte
  }

  /* PERFORMANCE TEST */
  /* -------------------------------------------------------------------------------- */
  const end = window.performance.now();
  const elapsedTime = end - start;
  console.log(`Time taken for KSA: ${elapsedTime}`);

  /* FOR FREQUENCY TEST */
  /* -------------------------------------------------------------------------------- */
  console.log("Frequency Test Results");
  function combineHextoBin(state) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        state[i][j] = parseInt(state[i][j], 16).toString(2).padEnd(8, "0");
      }
    }
    for (let i = 0; i < 4; i++) {
      state[i] = state[i].join("");
    }
    return state.join("");
  }
  for (let i = 0; i < 10; i++) {
    let subKey = createGroups(expandedKeys, 30);
    let bitDiff = xorState(subKey[i], subKey[i + 1]);
    bitDiff = combineHextoBin(bitDiff);
    let count = 0;
    for (let i = 0; i < bitDiff.length; i++) {
      if (bitDiff[i] === "1") {
        count++;
      }
    }
    console.log(
      `Round ${i + 1}: ${(1 - Math.abs(50 - (count / 128) * 100) / 50) * 100}%`
    );
  }

  return expandedKeys; // keys are returned as a word (w0, w1, w2, ... w44)
}
