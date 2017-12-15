function loadProfile(userAddress, urlNickname) {
	getUserNickname(userAddress, (userNickname) => {
        userNicknameGlobal = userNickname;
		if (urlNickname != userNickname) {
            $("#nick-name").html(urlNickname);

            isFollowing(userNickname, urlNickname, (res) => {
                if (res == true) {
                    $("#divNicknameAndButton").append('<button id="unfollowButton">Отписаться</button>');

                    $("#unfollowButton").click(function() {
                        $("#loader").show();
                        Enstagrm.unfollow(urlNickname, {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                                $("#unfollow").html("ok");
                            }
                            $("#loader").hide();
                        });
                    });

				} else {

                    $("#divNicknameAndButton").append('<button id="followButton">Подписаться</button>');

                    $("#followButton").click(function() {
                        $("#loader").show();
                        Enstagrm.follow(urlNickname, {from: web3.eth.defaultAccount, gas:3000000}, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                            $("#loader").hide();
                        });
                    });
                }
            });
		} else {
            $("#nick-name").html(urlNickname + " (you)");
		}

		getUserProfile(urlNickname, (profile) => {
			user = profile;
			$("#real-name").html(profile["realName"]);
			$("#bio").html(profile["bio"]);
			profile.ipfsLink == "" ? $("#avatar").attr("src", "bootstrap/images/altphoto.png") : $("#avatar").attr("src", "http://ipfs.io/ipfs/" + profile.ipfsLink);
		});

		countUserFollowers(urlNickname, (result) => {
			$("#followers-count").html('<strong>' + result + '</strong>' + " подписчиков");
		});

		countUserFollowings(urlNickname, (result) => {
			$("#following-count").html('<strong>' + result + '</strong>' + " подписок");
		});

		countUserPosts(urlNickname, (result) => {
			$("#wall-count").html('<strong>' + result + '</strong>' + " публикаций");
		});

		getUserPosts(urlNickname, (result) => {
			posts = result;
			result.forEach(function (item) {
				console.log(item);
				$("#profile_photos").append(
					'<a class="single_profile_photo" href="#' + item["postId"] + '" data-toggle="modal" data-target="#myModal" id="' + item['postId'] + '">\n' +
					'\t\t\t\t<div class="wrap" data-id="' + item["postId"] + '" style="background: url(\'http://ipfs.io/ipfs/' + item["urlPhoto"] + '\') no-repeat center center; background-size: contain;">\n' +
					'\t\t\t\t\t<div class="hover col-12" data-id="' + item["postId"] + '">\n' +
					'\t\t\t\t\t\t<div class="col-10 offset-1">\n' +
					'\t\t\t\t\t\t\t<p class="hover_info">' + item["likesCount"] + '<i class="fa fa-circle-thin" aria-hidden="true"></i></p>\n' +
					'\t\t\t\t\t\t\t<p class="hover_info">' + item["commentsCount"] + '<i class="fa fa-comment-o" aria-hidden="true"></i></p>\n' +
					'\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t</div>\n' +
					'\t\t\t\t</div>\n' +
					'\t\t\t</a>'
				);
			});

			$(".single_profile_photo").click(onSnippetClick);
		});
	})
}
		