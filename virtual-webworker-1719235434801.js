self.addEventListener("message",async({data:s})=>{if(s.op in r.ops)try{const e=await r.ops[s.op](...s.args);self.postMessage({reqID:s.reqID,status:"ok",result:e})}catch(e){self.postMessage({reqID:s.reqID,status:"err",result:e})}else self.postMessage({status:"err",reqID:s.reqID,result:"method in service not exist"})});var r={ops:{},register(s,e){this.ops[s]=e}};
