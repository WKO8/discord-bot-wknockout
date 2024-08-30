import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";

// Command receiving custom parameters
// COCA_LEAF_COMMAND
const COCA_LEAF_COMMAND = {
  name: "folhas_de_coca",
  description: "Controle de folhas de coca",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de folhas de coca",
      required: true,
    },
  ],
};

// READY_COCAINE_COMMAND
const READY_COCAINE_COMMAND = {
  name: "cocaina_pronta",
  description: "Controle de cocaínas prontas",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de cocaínas prontas",
      required: true,
    },
  ],
};

// LOCKPICK_COMMAND
const LOCKPICK_COMMAND = {
  name: "lockpick",
  description: "Controle de lockpicks",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de lockpicks",
      required: true,
    },
  ],
};

// BANDAGE_COMMAND
const BANDAGE_COMMAND = {
  name: "bandagem",
  description: "Controle de bandagens",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de bandagens",
      required: true,
    },
  ],
};

// ILLEGAL_MONEY_COMMAND
const ILLEGAL_MONEY_COMMAND = {
  name: "dinheiro_sujo",
  description: "Controle de dinheiro sujo",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de dinheiro sujo",
      required: true,
    },
  ],
};

// LEGAL_MONEY_COMMAND
const LEGAL_MONEY_COMMAND = {
  name: "dinheiro_limpo",
  description: "Controle de dinheiro limpo",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de dinheiro limpo",
      required: true,
    },
  ],
};

// DRUG_TABLE_COMMAND
const DRUG_TABLE_COMMAND = {
  name: "mesa_de_droga",
  description: "Controle de mesas de droga",
  options: [
    {
      type: 3, // STRING type
      name: "acao",
      description: "Escolha o que deseja fazer",
      required: true,
      choices: [
        { name: "adicionar", value: "add" },
        { name: "retirar", value: "sub" },
        { name: "atualizar", value: "update" },
        { name: "total", value: "total" },
      ],
    },
    {
      type: 4, // INTEGER type
      name: "quantidade",
      description: "Insira a quantidade de mesas de droga",
      required: true,
    },
  ],
};


const ALL_COMMANDS = [COCA_LEAF_COMMAND, READY_COCAINE_COMMAND, LOCKPICK_COMMAND, BANDAGE_COMMAND, ILLEGAL_MONEY_COMMAND, LEGAL_MONEY_COMMAND, DRUG_TABLE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS)
  .then(() => console.log("Commands installed successfully"))
  .catch(console.error);
