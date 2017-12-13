pragma solidity ^0.4.18;

contract Enstagrm {

    /**
    * 
    * REGISTRATION LOGIC
    * 
    */
    
    bytes16[] users;
    
    mapping (address => bytes16) addressNicknames;
    mapping (bytes16 => address) nicknameAddress;
    
    
    modifier onlyRegistredUser()
    {
        require(addressIsRegistred(msg.sender)); 
        _;
    }
    
    
    event UserRegistred (address userAddress, bytes32 userNickname);
    
    
    function addressIsRegistred(address _address) view public returns(bool) {
        return addressNicknames[_address] != bytes16(0x0);
    }
    
    function nicknameIsAvailable(bytes16 _nickname) view public returns(bool) {
        return nicknameAddress[_nickname] == address(0);
    }
    
    
    function register(bytes16 _nickname) public {
        require(!addressIsRegistred(msg.sender)); 
        require(_nickname.length > 0 );
        require(nicknameIsAvailable(_nickname)); 
        
        addressNicknames[msg.sender] = _nickname;
        nicknameAddress[_nickname] = msg.sender;
        
        users.push(_nickname);
        
        UserRegistred(msg.sender, _nickname);
    }
    
    function getUserNickname(address _address) view public returns(bytes16) {
        return addressNicknames[_address];
    }
    
    
    function getUsers() view public returns(bytes16[]) {
        return users;
    }
    
    function countUsers() view public returns(uint) {
        return users.length;
    }
    
    // Not yet implemented in solidity
    //
    // function getUsersProfiles() view public returns (string[], string[], string[], string[]) {
    //     string[] memory nicknames     = new string[](users.length);
    //     string[] memory realNames     = new string[](users.length);
    //     string[] memory bios          = new string[](users.length);
    //     string[] memory profileImages = new string[](users.length);

    //     for (uint i = 0; i < users.length; i++) {
    //         string storage nickname = addressNicknames[users[i]];
    //         Profile storage profile = nicknameProfiles[nickname];
    //         nicknames[i] = nickname;
    //         realNames[i] = profile.realName;
    //         bios[i] = profile.bio;
    //         profileImages[i] = profile.profileImage;
    //     }
        
    //     return (nicknames, realNames, bios, profileImages);
    // }
    
    
    
    /**
    * 
    * PROFILE LOGIC
    * 
    */
    
    struct Profile {
        bytes32 realName;
        string bio;
        string urlProfileImage;
        
        uint32[] postIds;
        bytes16[] followers;
        bytes16[] followings;
    }


    mapping (bytes16 => Profile) nicknameProfiles;
    
    
    event ProfileUpdated (bytes16 userNickname, bytes32 realName, string bio, string urlProfileImage);
    
    
    function fillProfile(bytes32 _realName, string _bio, string _ipfsLink) public onlyRegistredUser {
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        
        nicknameProfiles[msgSenderNickname].realName = _realName;
        nicknameProfiles[msgSenderNickname].bio = _bio;
        nicknameProfiles[msgSenderNickname].urlProfileImage = _ipfsLink;
        
        ProfileUpdated(msgSenderNickname, _realName, _bio, _ipfsLink);
    }

    function getUserProfile(bytes16 _userNickname) view public returns(bytes32, string, string) {
        return (
            nicknameProfiles[_userNickname].realName, 
            nicknameProfiles[_userNickname].bio, 
            nicknameProfiles[_userNickname].urlProfileImage
        );
    }
    
    // Not yet implemented in solidity
    //
    // function getUserPosts(address _address) view public returns(Post[]) {
    //     return nicknameProfiles[_address].posts;
    // }
    
    function getUserPostIds(bytes16 _userNickname) view public returns(uint32[]) {
        return nicknameProfiles[_userNickname].postIds;
    }
    
    function getUserFollowers(bytes16 _userNickname) view public returns(bytes16[]) {
        return nicknameProfiles[_userNickname].followers;
    }
    
    function getUserFollowings(bytes16 _userNickname) view public returns(bytes16[]) {
        return nicknameProfiles[_userNickname].followings;
    }
    
    
    function countUserPosts(bytes16 _userNickname) view public returns(uint) {
        return nicknameProfiles[_userNickname].postIds.length;
    }
    
    function countUserFollowers(bytes16 _userNickname) view public returns(uint) {
        return nicknameProfiles[_userNickname].followers.length;
    }
    
    function countUserFollowings(bytes16 _userNickname) view public returns(uint) {
        return nicknameProfiles[_userNickname].followings.length;
    }
    
    
    
    /**
    * 
    * SUBSCRIPTION LOGIC
    * 
    */
    
    mapping (bytes16 => mapping (bytes16 => bool)) subscriptions;
    
    
    event SubscriptionHappened (bytes16 follower, bytes16 following);
    event UnsubscribingHappened (bytes16 follower, bytes16 unfollowing);
    
    
    function follow(bytes16 _userNickname) public onlyRegistredUser {
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        
        require(!nicknameIsAvailable(_userNickname));
        require(subscriptions[msgSenderNickname][_userNickname] == false);
        require(msgSenderNickname != _userNickname);
        
        nicknameProfiles[_userNickname].followers.push(msgSenderNickname);
        nicknameProfiles[msgSenderNickname].followings.push(_userNickname);
        
        subscriptions[msgSenderNickname][_userNickname] = true;
        
        SubscriptionHappened(msgSenderNickname, _userNickname);
    }

    function unfollow(bytes16 _userNickname) public onlyRegistredUser {
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        
        require(!nicknameIsAvailable(_userNickname));
        require(subscriptions[msgSenderNickname][_userNickname] == true);
        require(msgSenderNickname != _userNickname);
        
        for (uint i = 0; i < countUserFollowers(_userNickname); i++) {
            if (nicknameProfiles[_userNickname].followers[i] == msgSenderNickname) {
                delete nicknameProfiles[_userNickname].followers[i];
                var insexOfLastFollower = countUserFollowers(_userNickname) - 1;
                nicknameProfiles[_userNickname].followers[i] = nicknameProfiles[_userNickname].followers[insexOfLastFollower];
                nicknameProfiles[_userNickname].followers.length--;
            }
        }
        
        for (uint j = 0; j < countUserFollowings(msgSenderNickname); j++) {
            if (nicknameProfiles[msgSenderNickname].followings[j] == _userNickname) {
                delete nicknameProfiles[msgSenderNickname].followings[j];
                var insexOfLastFollowing = countUserFollowings(msgSenderNickname) - 1;
                nicknameProfiles[msgSenderNickname].followings[j] = nicknameProfiles[msgSenderNickname].followings[insexOfLastFollowing];
                nicknameProfiles[msgSenderNickname].followings.length--;
            }
        }
        
        subscriptions[msgSenderNickname][_userNickname] = false;
        
        UnsubscribingHappened(msgSenderNickname, _userNickname);
    }



    /**
    * 
    * POST ADDING LOGIC
    * 
    */
    
    struct Post {
        bytes16 creator;
        string urlPhoto;
        string text;
        uint64 timestamp;
        
        bytes16[] likes;
        uint32[] comments; // unique comment ids
    }
    
    Post[] posts;
    
    
    event PostAdded(uint32 postId, bytes16 creator, string urlPhoto, string text, uint64 timestamp);
    
    
    function addPost(string _urlPhoto, string _text) public onlyRegistredUser returns (uint32) {
        bytes memory b1 = bytes(_urlPhoto);
        bytes memory b2 = bytes(_text);
        require(b1.length > 0 && b2.length > 0);
        
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        
        Post memory newPost = Post({
            creator: msgSenderNickname,
            urlPhoto: _urlPhoto,
            text: _text,
            timestamp: uint64(now),
            likes: new bytes16[](0),
            comments: new uint32[](0)
        });
        uint32 newPostId = uint32(posts.push(newPost)) - 1;
        
        nicknameProfiles[msgSenderNickname].postIds.push(newPostId);
        
        PostAdded(newPostId, msgSenderNickname, _urlPhoto, _text, uint64(now));
        
        return newPostId;
    }
    
    function getPost(uint32 _id) view public returns(bytes16, string, string, uint64) {
        Post storage post = posts[_id];
        return (post.creator, post.urlPhoto, post.text, post.timestamp);
    }


    /**
    * 
    * LIKE ADDING LOGIC
    * 
    */

    mapping (bytes16 => mapping (uint32 => bool)) userPostLikes;
    
    
    event PostLiked(uint32 postId, bytes16 creator, uint64 timestamp);
    
    
    function like(uint32 _id) public onlyRegistredUser {
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        require(userPostLikes[msgSenderNickname][_id] == false);
        
        posts[_id].likes.push(msgSenderNickname);
        userPostLikes[msgSenderNickname][_id] = true;
        
        PostLiked(_id, msgSenderNickname, uint64(now));
    }
    
    function getPostLikes(uint32 _id) view public returns(bytes16[]) {
        return posts[_id].likes;
    }
    
    function countPostLikes(uint32 _id) view public returns(uint) {
        return posts[_id].likes.length;
    }

    
    /**
    * 
    * COMMENT ADDING LOGIC
    * 
    */
    
    struct Comment {
        bytes16 creator;
        string text;
        uint64 timestamp;
    }
    
    mapping (uint32 => Comment[]) postComments;
    
    
    event PostCommented(uint32 postId, bytes16 creator, string text, uint64 timestamp);
    
    
    function comment(uint32 _id, string _text) public onlyRegistredUser {
        require(bytes(_text).length != 0);
        
        bytes16 msgSenderNickname = getUserNickname(msg.sender);
        
        postComments[_id].push(Comment({
            creator: msgSenderNickname,
            text: _text,
            timestamp: uint64(now)
        }));
        
        PostCommented(_id, msgSenderNickname, _text, uint64(now));
    }
    
    
    // Not yet implemented in solidity
    //
    // function getPostComments(bytes32 _id) view public returns(Comment[]) {
    //     return postComments[_id];
    // }
    
    function getPostComment(uint32 _postId, uint index) view public returns(bytes16, string, uint64) {
        Comment storage comment = postComments[_postId][index];
        return (comment.creator, comment.text, comment.timestamp);
    }
    
    function countPostCommentsLength(uint32 _postId) view public returns(uint) {
        return postComments[_postId].length;
    }
    
}