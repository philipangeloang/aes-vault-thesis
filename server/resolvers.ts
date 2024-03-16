import { Context } from "./context";
import { HiplipKeyExpansion } from "./aes/aes_key_expansion/hiplip_key_expansion.js";
import { HiplipAESEncrypt } from "./aes/aes_encrpyt/hiplip_aes_encrypt";
import { HiplipAESDecrypt } from "./aes/aes_decrypt/hiplip_aes_decrypt";
import { ModifiedKeyExpansion } from "./aes/aes_key_expansion/modified_aes_key_expansion";
import { ModifiedAESEncrypt } from "./aes/aes_encrpyt/modified_aes_encrypt";
import { ModifiedAESDecrypt } from "./aes/aes_decrypt/modified_aes_decrypt";

function textToHex(text: string): string {
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i).toString(16);
    hex += charCode.padStart(2, "0");
  }
  return hex;
}

function hexToText(hex: string): string {
  let text = "";
  for (let i = 0; i < hex.length; i += 2) {
    let byte = parseInt(hex.substr(i, 2), 16);
    if (byte !== 0) {
      text += String.fromCharCode(byte);
    }
  }
  return text;
}
export const resolvers = {
  Query: {
    async secrets(_parent: any, _args: any, context: Context) {
      return await context.prisma.secret.findMany();
    },
    async secretsDRS(_parent: any, _args: any, context: Context) {
      return await context.prisma.secretDRS.findMany();
    },
    async secret(_parent: any, args: any, context: Context) {
      const secretInstance: any = await context.prisma.secret.findFirst({
        where: {
          id: args.id,
        },
      });

      const shallowSecretInstance = { ...secretInstance };

      const decrpytedPlainKey = textToHex(shallowSecretInstance?.password);

      const argumentHexKey = textToHex(args.password);
      const expandedKey = HiplipKeyExpansion(argumentHexKey, 30);
      const encryptedArgumentHexKey = HiplipAESEncrypt(
        argumentHexKey,
        expandedKey
      );

      if (encryptedArgumentHexKey === decrpytedPlainKey) {
        const expandedKey = HiplipKeyExpansion(argumentHexKey, 30);
        const pulledSecret = textToHex(shallowSecretInstance?.secret);
        const transformedPulledSecret = HiplipAESDecrypt(
          pulledSecret,
          expandedKey
        );
        const decryptedPulledSecret = hexToText(transformedPulledSecret);
        shallowSecretInstance.secret = decryptedPulledSecret;

        return shallowSecretInstance;
      } else {
        throw new Error("Wrong Password");
      }
    },
    async secretDRS(_parent: any, args: any, context: Context) {
      const secretInstance: any = await context.prisma.secretDRS.findFirst({
        where: {
          id: args.id,
        },
      });

      const shallowSecretInstance = { ...secretInstance };

      const decrpytedPlainKey = textToHex(shallowSecretInstance?.password);

      const argumentHexKey = textToHex(args.password);
      const expandedKey = ModifiedKeyExpansion(argumentHexKey);
      const encryptedArgumentHexKey = ModifiedAESEncrypt(
        argumentHexKey,
        expandedKey
      );

      if (encryptedArgumentHexKey === decrpytedPlainKey) {
        const expandedKey = ModifiedKeyExpansion(argumentHexKey);
        const pulledSecret = textToHex(shallowSecretInstance?.secret);
        const transformedPulledSecret = ModifiedAESDecrypt(
          pulledSecret,
          expandedKey
        );
        const decryptedPulledSecret = hexToText(transformedPulledSecret);
        shallowSecretInstance.secret = decryptedPulledSecret;

        return shallowSecretInstance;
      } else {
        throw new Error("Wrong Password");
      }
    },
  },
  Mutation: {
    async addSecret(_parent: any, args: any, context: Context) {
      // Text to Hex
      const hexSecret = textToHex(args.secret.secret);
      const hexKey = textToHex(args.secret.password);
      const expandedKey = HiplipKeyExpansion(hexKey, 30);

      // Extra Step to Encrpyt Password too
      const encryptedHexKey = HiplipAESEncrypt(hexKey, expandedKey);
      const encryptedPlainKey = hexToText(encryptedHexKey);

      //  Encrpyt
      const encryptedHex = HiplipAESEncrypt(hexSecret, expandedKey);
      const encryptedPlain = hexToText(encryptedHex);

      return await context.prisma.secret.create({
        data: {
          secret: encryptedPlain,
          password: encryptedPlainKey,
        },
      });
    },
    async addSecretDRS(_parent: any, args: any, context: Context) {
      // Text to Hex
      const hexSecret = textToHex(args.secret.secret);
      const hexKey = textToHex(args.secret.password);
      const expandedKey = ModifiedKeyExpansion(hexKey);

      // Extra Step to Encrpyt Password too
      const encryptedHexKey = ModifiedAESEncrypt(hexKey, expandedKey);
      const encryptedPlainKey = hexToText(encryptedHexKey);

      //  Encrpyt
      const encryptedHex = ModifiedAESEncrypt(hexSecret, expandedKey);
      const encryptedPlain = hexToText(encryptedHex);

      return await context.prisma.secretDRS.create({
        data: {
          secret: encryptedPlain,
          password: encryptedPlainKey,
        },
      });
    },
    async deleteSecret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.delete({
        where: { id: args.id },
      });
    },
    async deleteSecretDRS(_parent: any, args: any, context: Context) {
      return await context.prisma.secretDRS.delete({
        where: { id: args.id },
      });
    },
    async updateSecret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.edits,
        },
      });
    },
    async updateSecretDRS(_parent: any, args: any, context: Context) {
      return await context.prisma.secretDRS.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.edits,
        },
      });
    },
  },
};
