import con from "../utils/db-connection.js";

export async function getAllAgenciesAndAgents() {
  try {
    const query =
      "SELECT * FROM agencies LEFT JOIN agents ON agents.Agencyid=agencies.Agencyid ORDER BY agencies.AgencyID, agents.AgtPosition;";
    const [results] = await con.query(query);

    let Agencywithagents = {};

    results.forEach((result) => {
      let agentInfo = {
        AgentId: result.AgentId,
        AgtFirstName: result.AgtFirstName,
        AgtMiddleInitial: result.AgtMiddleInitial,
        AgtLastName: result.AgtLastName,
        AgtBusPhone: result.AgtBusPhone,
        AgtEmail: result.AgtEmail,
        AgtPosition: result.AgtPosition,
      };

      if (!Agencywithagents[result.AgencyId]) {
        Agencywithagents[result.AgencyId] = {
          AgencyId: result.AgencyId,
          AgncyAddress: result.AgncyAddress,
          AgncyCity: result.AgncyCity,
          AgncyProv: result.AgncyProv,
          AgncyPostal: result.AgncyPostal,
          AgncyCountry: result.AgncyCountry,
          AgncyPhone: result.AgncyPhone,
          AgncyFax: result.AgncyFax,
          agents: [agentInfo],
        };
      } else {
        Agencywithagents[result.AgencyId].agents.push(agentInfo);
      }
    });
    // console.log(Agencywithagents,"REAL DATA");
    return Agencywithagents;
  } catch (error) {
    console.log("Error in importing data from table.", error);
  }

}
