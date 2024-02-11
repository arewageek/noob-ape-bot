class Auth {

    testUser = {
        name: "arewaofweb3",
        name: "Traiz07",
        balance: 200
    }

    check(user){
        if(user === this.testUser.username){
            return "valid"
        }
        return "invalid"
    }

    async connect (user) {
        try{
            const state = this.check(user)

            console.log(state)

            if(state === "invalid"){
                // connect to mongodb database

                console.log("User authentication successful")
                return false;
            }

           else{
                console.log("User already authenticated")
           }
        }
        catch(err){
            console.log(err)
            throw new Error("Error authenticating user")
        }
    }
}

const auth = new Auth();

module.exports = auth