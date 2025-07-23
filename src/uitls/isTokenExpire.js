export default function isTokenExpire(tokenTimestamp){
    const currentTimestamp = Math.floor(Date.now()/1000) //converting milisecond to second;
    return currentTimestamp > tokenTimestamp;
}