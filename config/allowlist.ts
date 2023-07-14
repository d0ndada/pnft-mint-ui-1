export type AllowListConfig = {
  [guard: string]: string[]
}

//Configure allowlists here. The key is the guard group name, and the value is an array of addresses to allowlist.
//Default would be outside of guard groups so keep it if all groups are using the same allowlist.
export const allowListConfig: AllowListConfig = {
  default: [],
  late: [
    "7Jqg3JoEKBTqVzyt2PPWE3fYsYndYbCNLUo2Fz7XAHGS",
      "6BnRx4VUeiLsq4eUpLq2sKfvVQdRQVchc4gQarDmrAdw",
  ],
  public: [],
  allowList2: [],
  allowList3: [],
}
