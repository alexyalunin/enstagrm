
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
var userNicknameGlobal = "";


const userAddress = web3.eth.defaultAccount;
const EnstagrmContract = web3.eth.contract([ { "constant": true, "inputs": [], "name": "getUsers", "outputs": [ { "name": "", "type": "bytes16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_address", "type": "address" } ], "name": "getUserNickname", "outputs": [ { "name": "", "type": "bytes16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_nickname", "type": "bytes16" } ], "name": "register", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "uint32" } ], "name": "countPostLikes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_id", "type": "uint32" }, { "name": "_text", "type": "string" } ], "name": "comment", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_firstUser", "type": "bytes16" }, { "name": "_secondUser", "type": "bytes16" } ], "name": "isFollowing", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "countUserPosts", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_postId", "type": "uint32" }, { "name": "index", "type": "uint256" } ], "name": "getPostComment", "outputs": [ { "name": "", "type": "bytes16" }, { "name": "", "type": "string" }, { "name": "", "type": "uint64" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "countUserFollowers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "getUserProfile", "outputs": [ { "name": "", "type": "bytes32" }, { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_id", "type": "uint32" } ], "name": "like", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "getUserFollowers", "outputs": [ { "name": "", "type": "bytes16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "getUserPostIds", "outputs": [ { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_address", "type": "address" } ], "name": "addressIsRegistred", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_urlPhoto", "type": "string" }, { "name": "_text", "type": "string" } ], "name": "addPost", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "uint32" } ], "name": "getPostLikes", "outputs": [ { "name": "", "type": "bytes16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "countUserFollowings", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_postId", "type": "uint32" } ], "name": "countPostCommentsLength", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_nickname", "type": "bytes16" } ], "name": "nicknameIsAvailable", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_realName", "type": "bytes32" }, { "name": "_bio", "type": "string" }, { "name": "_ipfsLink", "type": "string" } ], "name": "fillProfile", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "getUserFollowings", "outputs": [ { "name": "", "type": "bytes16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "uint32" } ], "name": "getPost", "outputs": [ { "name": "", "type": "bytes16" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint64" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "follow", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_userNickname", "type": "bytes16" } ], "name": "unfollow", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "countUsers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "userAddress", "type": "address" }, { "indexed": false, "name": "userNickname", "type": "bytes32" } ], "name": "UserRegistred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "userNickname", "type": "bytes16" }, { "indexed": false, "name": "realName", "type": "bytes32" }, { "indexed": false, "name": "bio", "type": "string" }, { "indexed": false, "name": "urlProfileImage", "type": "string" } ], "name": "ProfileUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "follower", "type": "bytes16" }, { "indexed": false, "name": "following", "type": "bytes16" } ], "name": "SubscriptionHappened", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "follower", "type": "bytes16" }, { "indexed": false, "name": "unfollowing", "type": "bytes16" } ], "name": "UnsubscribingHappened", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "postId", "type": "uint32" }, { "indexed": false, "name": "creator", "type": "bytes16" }, { "indexed": false, "name": "urlPhoto", "type": "string" }, { "indexed": false, "name": "text", "type": "string" }, { "indexed": false, "name": "timestamp", "type": "uint64" } ], "name": "PostAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "postId", "type": "uint32" }, { "indexed": false, "name": "creator", "type": "bytes16" }, { "indexed": false, "name": "timestamp", "type": "uint64" } ], "name": "PostLiked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "postId", "type": "uint32" }, { "indexed": false, "name": "creator", "type": "bytes16" }, { "indexed": false, "name": "text", "type": "string" }, { "indexed": false, "name": "timestamp", "type": "uint64" } ], "name": "PostCommented", "type": "event" }]);
const Enstagrm = EnstagrmContract.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');


getUserNickname(web3.eth.defaultAccount, (nick) => {
    userNicknameGlobal = nick;
    console.log(nick);
    $("#profileNavButton").attr("href", "profile.html?" + userNicknameGlobal);
});


function nicknameIsAvailable(nick, callback) {
    Enstagrm.nicknameIsAvailable(nick, (err, res) => {
        if (err) {
            console.log(err);
            location="404.html";
        } else {
            callback(res);
        }
    });
}

function addressIsRegistred(address, callback) {
    Enstagrm.addressIsRegistred(address, (err, res) => {
        if (err) {
            console.log(err);
            location="index.html";
        } else {
            if (res == true){
                callback(res);
            } else {
                location="index.html";
            }
        }
    });
}

function isFollowing(nickname1, nickname2, callback) {
    Enstagrm.isFollowing(nickname1, nickname2, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            callback(res);
        }
    });
}


function getUserProfile(nickname, callback) {
    Enstagrm.getUserProfile(nickname, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            callback( {
                "realName": web3.toAscii(res[0]),
                "bio": res[1],
                "ipfsLink": res[2]
            });
        }
    });
}

function countUserFollowers(nickname, callback) {
    Enstagrm.countUserFollowers(nickname, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            callback(res.c);
        }
    });
}

function countUserFollowings(nickname, callback) {
    Enstagrm.countUserFollowings(nickname, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            callback(res.c);
        }
    });
}

function countUserPosts(nickname, callback) {
    Enstagrm.countUserPosts(nickname, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            callback(res.c);
        }
    });
}

function getUserNickname(address, callback) {
    Enstagrm.getUserNickname(address, (err, res) => {
        if (err) {
            console.log(err);
            location = "login.html";
        } else {
            console.log(web3.toAscii(res));
            callback(web3.toAscii(res).replace(/\0/g, ''));
        }
    });
}


function getUserPosts(nickname, callback) {
    Enstagrm.getUserPostIds(nickname, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            arrOfIndices = [];
            res.forEach(function(item) {
                arrOfIndices.push(item.c);
            });
            posts = [];
            for (var i = 0, len = arrOfIndices.length; i < len; i++) {
                (function(index) {
                    var postId = arrOfIndices[index][0];
                    Enstagrm.getPost(postId, (err, resultPostInfo) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Enstagrm.countPostLikes(postId, (err, resultNumberOfLikes) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    Enstagrm.countPostCommentsLength(postId, (err, resultNumberOfComments) => {

                                        var creator = web3.toAscii(resultPostInfo[0]);
                                        var urlPhoto = resultPostInfo[1];
                                        var text = resultPostInfo[2];
                                        var timestamp = (new Date(resultPostInfo[3] * 1000)).toLocaleString();
                                        var likes = resultNumberOfLikes.c[0];
                                        var comments = resultNumberOfComments.c[0];
                                        posts.push({
                                            "postId": postId,
                                            "creator": creator,
                                            "urlPhoto": urlPhoto,
                                            "text": text,
                                            "timestamp": timestamp,
                                            "likesCount": likes,
                                            "commentsCount": comments
                                        });
                                        if (index == len-1) {
                                            callback(posts);
                                        }

                                    });
                                }
                            });
                        }
                    });
                })(i)
            }
        }
    });
};



$("#followButton").click(function() {
    $("#loader").show();
    Enstagrm.follow($("#nicknameInput").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
            $("#follow").html("error");
        } else {
            console.log(res);
            $("#follow").html("ok");
        }
        $("#loader").hide();
    });
});

$("#unfollowButton").click(function() {
    $("#loader").show();
    Enstagrm.unfollow($("#nicknameInput").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
            $("#unfollow").html("error");
        } else {
            console.log(res);
            $("#unfollow").html("ok");
        }
        $("#loader").hide();
    });
});


$("#fillProfileButton").click(function() {
    $("#loader").show();

    const reader = new FileReader();
    reader.onloadend = function() {
        const ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' }); // Connect to IPFS
        const buf = buffer.Buffer(reader.result); // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
            var url = "";
            if(err) {
                console.error(err);
            } else {
                url = String(result[0].hash);
            }
            Enstagrm.fillProfile(
                $("#real-name").val(),
                $("#bio").val(),
                url,
                {from: web3.eth.defaultAccount, gas:3000000},
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                    $("#loader").hide();
                }
            );
        })
    }
    const photo = document.getElementById("input-b5");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

});



$("#addPostButton").click(function() {
    $("#loader").show();

    const reader = new FileReader();
    reader.onloadend = function() {
        const ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' }); // Connect to IPFS
        const buf = buffer.Buffer(reader.result); // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS

            if(err) {
                console.error(err);
                $("#loader").hide();
                return
            }
            let url = String(result[0].hash);


            Enstagrm.addPost(url, $("#your_comments_input").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
                $("#loader").hide();
            });


        })
    }
    const photo = document.getElementById("imgInp");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
});




// ------------------Get------------------

$("#countUsers").click(function() {
    $("#loader").show();
    Enstagrm.countUsers((err, res) => {
        if (err) {
            console.log(err);
            $("#numberOfUsers").html("error");
        } else {
            console.log(res);
            $("#numberOfUsers").html(res);
        }
        $("#loader").hide();
    });
});


$("#addressIsRegistredButton").click(function() {
    $("#loader").show();
    Enstagrm.addressIsRegistred($("#addressInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#addressIsRegistred").html("error");
        } else {
            console.log(res);
            $("#addressIsRegistred").html(String(res));
        }
        $("#loader").hide();
    });
});


$("#nicknameIsAvailableButton").click(function() {
    $("#loader").show();
    Enstagrm.nicknameIsAvailable($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#nicknameIsAvailable").html("error");
        } else {
            console.log(res);
            $("#nicknameIsAvailable").html(String(res));
        }
        $("#loader").hide();
    });
});


$("#getUserNicknameButton").click(function() {
    $("#loader").show();
    Enstagrm.getUserNickname($("#addressInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserNickname").html("error");
        } else {
            console.log(res);
            $("#getUserNickname").html(web3.toAscii(res));
        }
        $("#loader").hide();
    });
});


$("#getUserProfileButton").click(function() {
    $("#loader").show();
    Enstagrm.getUserProfile($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserProfile").html("error");
        } else {
            console.log(res);
            $("#getUserProfile").html(" Real Name: " + web3.toAscii(res[0]) +" Bio: "  + res[1] + " Ipfs: " + res[2]);
        }
        $("#loader").hide();
    });
});



$("#getUserPostIdsButton").click(function() {
    $("#loader").show();
    Enstagrm.getUserPostIds($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserPostIds").html("error");
        } else {
            console.log(res);
            arrOfIndices = [];
            res.forEach(function(item) {
                arrOfIndices.push(item.c);
            });
            console.log(arrOfIndices);
            $("#getUserPostIds").html(arrOfIndices);
        }
        $("#loader").hide();
    });
});

$("#getUserFollowersButton").click(function() {
    $("#loader").show();
    Enstagrm.getUserFollowers($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserFollowers").html("error");
        } else {
            console.log(res);
            followers = [];
            res.forEach(function(item) {
                followers.push(web3.toAscii(item));
            });
            console.log(followers);
            $("#getUserFollowers").html(followers);
        }
        $("#loader").hide();
    });
});

$("#getUserFollowingsButton").click(function() {
    $("#loader").show();
    Enstagrm.getUserFollowings($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserFollowings").html("error");
        } else {
            console.log(res);
            followings = [];
            res.forEach(function(item) {
                followings.push(web3.toAscii(item));
            });
            console.log(followings);
            $("#getUserFollowings").html(followings);
        }
        $("#loader").hide();
    });
});

$("#countUserPostsButton").click(function() {
    $("#loader").show();
    Enstagrm.countUserPosts($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#countUserPosts").html("error");
        } else {
            console.log(res);
            $("#countUserPosts").html(res.c);
        }
        $("#loader").hide();
    });
});
$("#countUserFollowersButton").click(function() {
    $("#loader").show();
    Enstagrm.countUserFollowers($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#countUserFollowers").html("error");
        } else {
            console.log(res);
            $("#countUserFollowers").html(res.c);
        }
        $("#loader").hide();
    });
});
$("#countUserFollowingsButton").click(function() {
    $("#loader").show();
    Enstagrm.countUserFollowings($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#countUserFollowings").html("error");
        } else {
            console.log(res);
            $("#countUserFollowings").html(res.c);
        }
        $("#loader").hide();
    });
});

$("#getPostButton").click(function() {
    $("#loader").show();
    Enstagrm.getPost($("#postIdInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getPost").html("error");
        } else {
            console.log(res);
            var myDate = (new Date(res[3]*1000)).toLocaleString();
            $("#getPost").html("Creator: " + web3.toAscii(res[0])
                + ", urlphoto: " + res[1]
                + ", text: " + res[2]
                + ", time: " + myDate
            );
        }
        $("#loader").hide();
    });
});

$("#getPostLikesButton").click(function() {
    $("#loader").show();
    Enstagrm.getPostLikes($("#postIdInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getPostLikes").html("error");
        } else {
            console.log(res);

            var nicknamesLakers = []
            res.forEach(function(item) {
                nicknamesLakers.push(web3.toAscii(item));
            });
            $("#getPostLikes").html(nicknamesLakers);
        }
        $("#loader").hide();
    });
});

$("#getPostCommentsButton").click(function() {
    $("#loader").show();
    const postId = $("#postIdInput").val();
    Enstagrm.countPostCommentsLength(postId, (err, res) => {
        if (err) {
            console.log(err);
            $("#getPostComments").html("error 1");
        } else {
            var comments = [];
            for (i = 0; i < res; i++) {
                Enstagrm.getPostComment(postId, i, (err, res) => {
                    if (err) {
                        console.log(err);
                        $("#getPostComments").html("error 2");
                    } else {
                        var creator = web3.toAscii(res[0]);
                        var text = res[1];
                        var myDate = (new Date(res[2]*1000)).toLocaleString();
                        comments.push([creator, text, myDate]);
                    }
                });
            }
            $("#getPostComments").html("ok");
            console.log(comments);
        }
        $("#loader").hide();
    });
});

















// ------------------Set------------------

$("#registerButton").click(function(event) {
    event.preventDefault();
    $("#loader").show();
    var nick = $("#inputLogin").val();
    Enstagrm.register(nick, {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            $("#loader").hide();
            location = "profile.html?" + nick;
        }
    });
});





$("#likeButton").click(function() {
    $("#loader").show();
    Enstagrm.like($("#postIdInput").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
            $("#like").html("error");
        } else {
            console.log(res);
            $("#like").html("ok");
        }
        $("#loader").hide();
    });
});

$("#commentButton").click(function() {
    $("#loader").show();
    Enstagrm.comment($("#postIdInput").val(), $("#commentText").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
            $("#comment").html("error");
        } else {
            console.log(res);
            $("#comment").html("ok");
        }
        $("#loader").hide();
    });
});




