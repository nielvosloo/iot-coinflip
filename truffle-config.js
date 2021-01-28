

module.exports = {

     // Configure the paths to use during interaction
     contracts_directory:       "./contracts/enabled",
     migrations_directory:      "./migrations/enabled",
     contracts_build_directory: "./build/contracts",

     // Configure the compilers to use
     compilers: {

          solc: {
               version: "0.5.16",
               docker: false,
          },

     },

     // Define all of the relevant networks to interact with
     networks: {

          // Default network settings
          development: {
               host: "127.0.0.1",
               port: 7545,
               network_id: "5777",
          },

     },

};
