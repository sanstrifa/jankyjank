/** @param {NS} ns */
export async function main(ns) {
    const script_time = 2000;
      const target = ns.args[0];
      const servers = ["pserv-3","pserv-4","pserv-5"];
  
      let pserv0 = "pserv-3";
      let pserv1 = "pserv-4";
      let pserv2 = "pserv-5"; 
      
       const moneyThresh = ns.getServerMaxMoney(target) * 0.95;
  
       const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  
       while(true){
  
        if (ns.getServerSecurityLevel(target) > securityThresh) {
              // If the server's security level is above our threshold, weaken it
               ns.scp("weaken.js", pserv0);
               ns.exec("weaken.js", servers[0] , 50, target);
          }
          else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
  
             ns.scp("grow.js", pserv1);
            ns.exec("grow.js", servers[1], 50, target);
          } else {
              ns.scp("hack.js", pserv2);
            ns.exec("hack.js", servers[2], 50, target);
          }
          await ns.sleep(script_time);
      }
      }