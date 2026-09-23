export const API = "http://localhost:5000/api";
export async function request(path, options={}){
  const res = await fetch(API+path,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});
  const data = await res.json();
  if(!res.ok) throw new Error(data.message || "Request failed");
  return data;
}