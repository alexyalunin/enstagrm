
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[8];
const EnstagrmContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getUsers","outputs":[{"name":"","type":"bytes16[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getUserNickname","outputs":[{"name":"","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nickname","type":"bytes16"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint32"}],"name":"countPostLikes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_text","type":"string"}],"name":"comment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"countUserPosts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_postId","type":"uint32"},{"name":"index","type":"uint256"}],"name":"getPostComment","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"string"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"countUserFollowers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"getUserProfile","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"like","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"getUserFollowers","outputs":[{"name":"","type":"bytes16[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"getUserPostIds","outputs":[{"name":"","type":"uint32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"addressIsRegistred","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_urlPhoto","type":"string"},{"name":"_text","type":"string"}],"name":"addPost","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint32"}],"name":"getPostLikes","outputs":[{"name":"","type":"bytes16[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"countUserFollowings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_postId","type":"uint32"}],"name":"countPostCommentsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_nickname","type":"bytes16"}],"name":"nicknameIsAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_realName","type":"bytes32"},{"name":"_bio","type":"string"},{"name":"_ipfsLink","type":"string"}],"name":"fillProfile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"getUserFollowings","outputs":[{"name":"","type":"bytes16[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint32"}],"name":"getPost","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"follow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userNickname","type":"bytes16"}],"name":"unfollow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"countUsers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"userNickname","type":"bytes32"}],"name":"UserRegistred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userNickname","type":"bytes16"},{"indexed":false,"name":"realName","type":"bytes32"},{"indexed":false,"name":"bio","type":"string"},{"indexed":false,"name":"urlProfileImage","type":"string"}],"name":"ProfileUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"follower","type":"bytes16"},{"indexed":false,"name":"following","type":"bytes16"}],"name":"SubscriptionHappened","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"follower","type":"bytes16"},{"indexed":false,"name":"unfollowing","type":"bytes16"}],"name":"UnsubscribingHappened","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"postId","type":"uint32"},{"indexed":false,"name":"creator","type":"bytes16"},{"indexed":false,"name":"urlPhoto","type":"string"},{"indexed":false,"name":"text","type":"string"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"PostAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"postId","type":"uint32"},{"indexed":false,"name":"creator","type":"bytes16"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"PostLiked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"postId","type":"uint32"},{"indexed":false,"name":"creator","type":"bytes16"},{"indexed":false,"name":"text","type":"string"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"PostCommented","type":"event"}]);
const Enstagrm = EnstagrmContract.at('0xe65b8b4e14cf1022a931a809729d7c95b23073b9');

//            var instructorEvent = Coursetro.instructorInfo({},'latest');
//            instructorEvent.watch(function (err, result) {
//                if (!err) {
//                    if (result.blockHash != $("#instrans").html())
//                        $("#loader").hide();
//
//                    $("#insTrans").html('Block hash: ' +result.blockHash);
//                    $("#instructor").html(web3.toAscii(result.args.fName) + ' ' + web3.toAscii(result.args.lName) + ' (' + result.args.age + ' years old)');
//                } else {
//                    $("#loader").hide();
//                }
//            });
//            Coursetro.countInstructors((err, res) => {
//                if (res)
//                $("#countIns").html(res.c + ' Instructors');
//            });
//
//            $("#button").click(function() {
//                $("#loader").show();
//                Coursetro.setInstructor(web3.eth.defaultAccount, $("#age").val(), $("#fName").val(),$("#lName").val(), (err, res) => {
//                    if (err)
//                    $("#loader").hide();
//                });
//            });

$("#defaultAccount").html(web3.eth.defaultAccount);
$("#addressInput").val(web3.eth.defaultAccount);
Enstagrm.getUserNickname(web3.eth.defaultAccount, (err, res)=>{
    $("#nicknameInput").val(String(web3.toAscii(res)));
    $("#nickname").html(String(web3.toAscii(res)));
});




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
        } else {
            console.log(web3.toAscii(res));
            callback(web3.toAscii(res));
        }
    });
}



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

$("#getUserPostsButton").click(function() {
    $("#loader").show();
    posts = [];
    Enstagrm.getUserPostIds($("#nicknameInput").val(), (err, res) => {
        if (err) {
            console.log(err);
            $("#getUserPosts").html("error 1");
        } else {
            arrOfIndices = [];
            res.forEach(function(item) {
                arrOfIndices.push(item.c);
            });
            arrOfIndices.forEach(function(item) {
                Enstagrm.getPost(item, (err, res) => {
                    if (err) {
                        console.log(err);
                        $("#getUserPosts").html("error 2");
                    } else {
                        var creator = web3.toAscii(res[0]);
                        var urlPhoto = res[1];
                        var text = res[2];
                        var timestamp = (new Date(res[3]*1000)).toLocaleString();
                        posts.push([creator, urlPhoto, text, timestamp]);
                    }
                });
            });
        }
        $("#loader").hide();
    });
    console.log(posts);
});















// ------------------Set------------------

$("#registerButton").click(function(event) {
    event.preventDefault();
    $("#loader").show();
    console.log("123");
    Enstagrm.register($("#inputLogin").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            location = "profile.html";
        }
        $("#loader").hide();
    });
});


$("#fillProfileButton").click(function() {
    $("#loader").show();
    Enstagrm.fillProfile(
        $("#fillProfileRealNameInput").val(),
        $("#fillProfileBioInput").val(),
        $("#fillProfileIPFSLinkInput").val(),
        {from: web3.eth.defaultAccount, gas:3000000},
        (err, res) => {
        if (err) {
            console.log(err);
            $("#fillProfile").html("error");
        } else {
            console.log(res);
            $("#fillProfile").html("ok");
        }
        $("#loader").hide();
    });
});


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




$("#addPostButton").click(function() {
    $("#loader").show();

    const reader = new FileReader();
    reader.onloadend = function() {
        const ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' }); // Connect to IPFS
        const buf = buffer.Buffer(reader.result); // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS

            if(err) {
                console.error(err);
                return
            }
            let url = String(result[0].hash);


            Enstagrm.addPost(url, $("#postText").val(), {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
                if (err) {
                    console.log(err);
                    $("#addPost").html("error");
                } else {
                    console.log(res);
                    $("#addPost").html("ok");
                }
                $("#loader").hide();
            });


        })
    }
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
});

