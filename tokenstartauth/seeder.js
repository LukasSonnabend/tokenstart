//Script for creating fake Users
let  email, displayname, userDescription, fullname, password, ownProjects, backedProjects

//change n to number to generate
let n = 10

let mockUsers = []


for (let i = 0; i <= n; i++){

let mockName = makeid(5);

email =  mockName + "@gmail.com";

displayname = mockName;

userDescription = "The all that pane, game, secretly need not the overgrown stitching likewise, own we're his but eminent these word who typically yes, had always example, able he spineless, the he succeed the evening. Can with created, feedback right, your communicated. Descriptions, can the self-interest, great the empty encouraged thing kind of the these days, is refute."

fullname = mockName + makeid(5);

password = makeid(5);

ownProjects = []; 

backedProjects = [];

let mockUser = {
    email: email, 
    displayname: displayname,
    userDescription: userDescription, 
    fullname: fullname, 
    password: password, 
    ownProjects: ownProjects, 
    backedProjects: backedProjects
}

mockUsers.push(mockUser);

}

console.log(mockUsers)


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 