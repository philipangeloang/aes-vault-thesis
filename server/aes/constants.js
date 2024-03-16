// Text Data to be Encrypted and Decrypted
export const encrpytionData = [
  "8CE0522352A3622E39D82E4E0C69459B",
  "B7FFDB3473357E17A08D8DDE34D614B9",
  "AEF6A545B7B00CA10225CBE70EE25907",
  "2A60EF8D9F0F6909612E7CE1734F33D6",
  "B9A920481E1DC1705EB238D7C256665A",
  "AFDEAE30C1D4A939E89011467C11C955", // High
  "0AE231D3CC3865DAB650465BE5A61D62",
  "6AAB3E2CE1EB488AEDE3E5C271E7B59D",
  "5C484433CA71082A6544D0D923A5BC36",
  "F68545373518FE8658C8DF729DFCE965",
];

// Cipher Key
export const cipherKey = "45654C65644D6F796A44736569655273";

// Temporary Avalanche Entries
export const allKey1 = [
  "B3A29FF59A819F5BF6B9AF41FBA7BE93", //1
  "2F32B30051F1808E8FF3E0440EEFF43D", //2
  "65BB3DB5163CA56B388FA44518156F45", //3
  "E68585DC6BBA52013EE676BE0AF2F10E", //4
  "2762D80CEBF8FF36C8AD29AE5CF5D3AD", //5
  "BF20B2AAEAF5162BCB6A3736EEC56F75", //6
  "BA1E83967AF7699223F6DC125BF4C44D", //7
  "18AA0019AF8B669EECE63AE57155CFE4", //8
  "09D8A5397E0D65C2FD8FE81517803275", //9
  "3E64BA827097E648CA387E16421A49B5", //10
];

export const allKey2 = [
  "F84756FFA83F2FFF74E9B9E3C26E476C", //1
  "42BD8A1A9FF0FA91096C3B886F820C1B", //2
  "616C805C353F49F5FDBA163DD92BD668", //3
  "946C0199AE2EB5241747DF154A05D50C", //4
  "59C287045E148FF3C958AC78432985FA", //5
  "D3D9CCE19AFF704650C04DF4FB9F28F0", //6
  "19D905B7B6FA9E2147AFA662767CFEBB", //7
  "D65DCD48AEEC1E240A653CC5747B67FA", //8
  "89DC4B724D54307543E1B55C6DCEF6C6", //9
  "7C75DD0FC8F7408BD1F3C7713F706F5B", //10
];

export const allKey3 = [
  "38764FE91F91FF410FD5B35D1FDCF3F1", //1
  "0DBCA364F028AAA225909097757FDE5F", //2
  "2AE9D45DD510FDDBFD079C69FE0935DB", //3
  "1B6D145E935363D84D2E287B08FC52A7", //4
  "035401FFE71EA95FBFCFCF466FA3EA75", //5
  "B9FFF460AE557AB6BD863F4EB6CD6CF4", //6
  "3396FC9F456F30422F1C06821FAFDC06", //7
  "EBE7D2336D18A78E66178D04B93F4319", //8
  "34B0E95313BFB783B9CC246FF09F195D", //9
  "542DAFF9E511FCAC06F23FF386D46B78", //10
];

export const allKey4 = [
  "927D6250154680585A019DA7D4544D0E", //1
  "F66095D32986C244F4E801CC8521D1E0", //2
  "CDA65208EB5F6109A9DB3A6083E3969F", //3
  "D8983D76051478149FB7E526738CAD8C", //4
  "27DE97E07EB950B00607E95D22D68301", //5
  "842D0E8B43BF30DDC6E56DB4F592DABF", //6
  "FF5A74806AC07825D33EF9D200F2AD03", //7
  "D04A8E9B39831C16B3CBC26827F78C51", //8
  "68A710A49DFA38E1DEBBC830B0503D6B", //9
  "50641A8C050707C9A3F9040FCDA9D817", //10
];

// AES S-BOX
export const sBox = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe,
  0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4,
  0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7,
  0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3,
  0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09,
  0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3,
  0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe,
  0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
  0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92,
  0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c,
  0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19,
  0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
  0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2,
  0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5,
  0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25,
  0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86,
  0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e,
  0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42,
  0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];

export const rSbox = [
  0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81,
  0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e,
  0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23,
  0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66,
  0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72,
  0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65,
  0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46,
  0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a,
  0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca,
  0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91,
  0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6,
  0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
  0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f,
  0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2,
  0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8,
  0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
  0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93,
  0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb,
  0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6,
  0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d,
];

// AES Key Expansion Rcon Values
export const Rcon = [
  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36,
];
