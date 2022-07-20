import axios from "axios";
import Cookies from "universal-cookie";
class Auth {
  cookie = new Cookies();
  token = this.cookie.get("JWTtoken");
  constructor() {
    console.log("before if:", this.token)
    if (this.token) {
      console.log("Authentication", this.token.token)
      axios
        .post("http://localhost:5000/users/auth", { cookie: this.token.token })
        .then((result) => {
          console.log("auth:>", result);
          if (result.status === 200) {
            console.log("user is authentic");
            this.authenticated = true;
          } else {
            console.log("user is not authentic");
            this.authenticated = false;
          }
        })
        .catch((err) => {
          console.log("err:>>", err);
          console.log("user is not authentic");
          this.authenticated = false;
        });
    } else {
      this.authenticated = false;
    }
  }
  log_in = (cb) => {
    this.authenticated = true;
    cb();
  };

  log_out = (cb) => {
    this.authenticated = false;
    cb();
  };
  isAuthenticated() {
    return this.authenticated
  }

}
export default new Auth();
