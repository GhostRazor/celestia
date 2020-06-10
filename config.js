// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

// Check .env.example 
const { ADMIN, SUPPORT, CELESTIA_PREFIX, MODROLE, ADMINROLE, SYSTEMNOTICE } = process.env;

const config = {
  "admins": ADMIN, // ID of Bot Admin. Not required.
  "support": SUPPORT, // ID of Bot Support. Not required.

  defaultSettings: {
    "prefix": CELESTIA_PREFIX,
    "modRole": MODROLE, // Default mod role.
    "adminRole": ADMINROLE, // Default admin role.
    "systemNotice": SYSTEMNOTICE
  },
  
  permLevels: [
    { level: 1,
      name: "User", 
      check: () => true
    },
    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.appInfo.owner.id === message.author.id
    }
  ]
};

module.exports = config;
