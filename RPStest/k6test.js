import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 200,
  rps: 2000,
  duration: "300s"
};

export default function() {
  var popular = Math.ceil(Math.random() * 100000);
  var id = Math.ceil(Math.random() * 9000000 + 1000000);
  for (let i = 0; i < 8; i++) {
    let res = http.get("http://localhost:3002/artists/relatedArtists/" + (popular));
    check(res, {
      "status was 200": r => r.status == 200,
      "transaction time OK": r => r.timings.duration < 1000
    });
  }
  for (let k = 0; k < 2; k++) {
    let res = http.get("http://localhost:3002/artists/relatedArtists/" + (id));
    check(res, {
      "status was 200": r => r.status == 200,
      "transaction time OK": r => r.timings.duration < 1000
    });
  }
}