pragma solidity ^0.4.18;

contract Enstagrm {

    /**
    * 
    * REGISTRATION LOGIC
    * 
    */
    
    address[] users;
    
    mapping (address => bytes32) addressNicknames;
    mapping (bytes32 => address) nicknameAddress;
    
    modifier onlyRegistredUser()
    {
        require(addressIsRegistred(msg.sender)); 
        _;
    }
    
    
    function addressIsRegistred(address _address) view public returns(bool) {
        return addressNicknames[_address].length != 0;
    }
    
    function nicknameIsAvailable(bytes32 _nickname) view public returns(bool) {
        return nicknameAddress[_nickname] == 0x0;
    }
    
    
    function register(bytes32 _nickname) public {
        require(!addressIsRegistred(msg.sender)); 
        require(_nickname.length != 0 ); // TODO check if nickname has length more then 0
        require(nicknameIsAvailable(_nickname)); 
        
        addressNicknames[msg.sender] = _nickname;
        nicknameAddress[_nickname] = msg.sender;
        
        users.push(msg.sender);
    }
    
    function getUserNickname(address _address) view public returns(bytes32) {
        return addressNicknames[_address];
    }
    
    
    function getUsers() view public returns(address[]) {
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
        bytes32 bio;
        string urlProfileImage;
        
        bytes32[] postIds;
        address[] followers;
        address[] followings;
        
        uint postCounter;
    }


    mapping (address => Profile) addressProfiles;
    
    
    function fillProfile(bytes32 _realName, bytes32 _bio, string _ipfsLink) public onlyRegistredUser {
        addressProfiles[msg.sender].realName = _realName;
        addressProfiles[msg.sender].bio = _bio;
        addressProfiles[msg.sender].urlProfileImage = _ipfsLink;
    }

    function getUserProfileInfo(address _address) view public returns(bytes32, bytes32, string) {
        return (
            addressProfiles[_address].realName, 
            addressProfiles[_address].bio, 
            addressProfiles[_address].urlProfileImage
        );
    }
    
    // Not yet implemented in solidity
    //
    // function getUserPosts(address _address) view public returns(Post[]) {
    //     return addressProfiles[_address].posts;
    // }
    
    function getUserPostIds(address _address) view public returns(bytes32[]) {
        return addressProfiles[_address].postIds;
    }
    
    function getUserFollowers(address _address) view public returns(address[]) {
        return addressProfiles[_address].followers;
    }
    
    function getUserFollowings(address _address) view public returns(address[]) {
        return addressProfiles[_address].followings;
    }
    
    
    function countUserPosts(address _address) view public returns(uint) {
        return addressProfiles[_address].postIds.length;
    }
    
    function countUserFollowers(address _address) view public returns(uint) {
        return addressProfiles[_address].followers.length;
    }
    
    function countUserFollowings(address _address) view public returns(uint) {
        return addressProfiles[_address].followings.length;
    }
    
    
    /**
    * 
    * SUBSCRIPTION LOGIC
    * 
    */
    
    mapping (address => mapping (address => bool)) subscriptions;
    
    
    function follow(address _address) public onlyRegistredUser {
        require(addressIsRegistred(_address));
        require(subscriptions[msg.sender][_address] = false);
        
        addressProfiles[_address].followers.push(msg.sender);
        addressProfiles[msg.sender].followings.push(_address);
        
        subscriptions[msg.sender][_address] = true;
    }

    function unfollow(address _address) public onlyRegistredUser {
        require(addressIsRegistred(_address));
        require(subscriptions[msg.sender][_address] = true);
        
        for (uint i = 0; i < countUserFollowers(_address); i++) {
            if (addressProfiles[_address].followers[i] == msg.sender) {
                delete addressProfiles[_address].followers[i];
                var insexOfLastFollower = countUserFollowers(_address) - 1;
                addressProfiles[_address].followers[i] = addressProfiles[_address].followers[insexOfLastFollower];
                addressProfiles[_address].followers.length--;
            }
        }
        
        for (uint j = 0; j < countUserFollowings(msg.sender); j++) {
            if (addressProfiles[msg.sender].followings[j] == _address) {
                delete addressProfiles[msg.sender].followings[j];
                var insexOfLastFollowing = countUserFollowings(msg.sender) - 1;
                addressProfiles[msg.sender].followings[j] = addressProfiles[msg.sender].followings[insexOfLastFollowing];
                addressProfiles[msg.sender].followings.length--;
            }
        }
        
        subscriptions[msg.sender][_address] = false;
    }


    /**
    * 
    * POST ADDING LOGIC
    * 
    */

    mapping (bytes32 => Post) posts; // bytes32 are unique post ids
    
    struct Post {
        address creator;
        string urlPhoto;
        string text;
        uint timestamp;
        
        address[] likes;
        bytes32[] comments; // unique comment ids
    }
    

    function addPost(string _urlPhoto, string _text) public onlyRegistredUser {
        require(bytes(_urlPhoto).length != 0 && bytes(_text).length != 0);
        
        var counter = addressProfiles[msg.sender].postCounter;
        var id = keccak256(msg.sender, counter);
        
        posts[id] = Post({
            creator: msg.sender,
            urlPhoto: _urlPhoto,
            text: _text,
            timestamp: now,
            likes: new address[](0),
            comments: new bytes32[](0)
        });
        
        addressProfiles[msg.sender].postIds.push(id);
        addressProfiles[msg.sender].postCounter += 1;
    }
    
    
    function getPost(bytes32 _id) view public returns(address, string, string, uint) {
        var post = posts[_id];
        return (post.creator, post.urlPhoto, post.text, post.timestamp);
    }



    /**
    * 
    * LIKE ADDING LOGIC
    * 
    */

    mapping (address => mapping (bytes32 => bool)) userPostLikes;
    
    
    function like(bytes32 _id) public onlyRegistredUser {
        require(userPostLikes[msg.sender][_id] = false);
        
        posts[_id].likes.push(msg.sender);
        userPostLikes[msg.sender][_id] = true;
    }
    
    function getPostLikes(bytes32 _id) view public returns(address[]) {
        return posts[_id].likes;
    }
    
    function countPostLikes(bytes32 _id) view public returns(uint) {
        return posts[_id].likes.length;
    }

    // Not yet implemented in solidity
    //
    // function getPostComments(bytes32 _id) view public returns(Comment[]) {
    //     return postComments[_id];
    // }
    
    function getPostComment(bytes32 _id, uint index) view public returns(address, string, uint) {
        var comment = postComments[_id][index];
        return (comment.creator, comment.text, comment.timestamp);
    }
    
    function countPostComments(bytes32 _id) view public returns(uint) {
        return postComments[_id].length;
    }
    
    
    /**
    * 
    * COMMENT ADDING LOGIC
    * 
    */
    
    mapping (bytes32 => Comment[]) postComments;
    
    struct Comment {
        address creator;
        string text;
        uint timestamp;
    }
    
    function comment(bytes32 _id, string _text) public onlyRegistredUser {
        require(bytes(_text).length != 0);
        
        postComments[_id].push(Comment({
            creator: msg.sender,
            text: _text,
            timestamp: now
        }));
    }
    
}