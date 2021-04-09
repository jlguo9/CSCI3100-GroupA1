# API 设计文档

## 状态说明

|       状态        |                   说明                   |     应用API      |
| :---------------: | :--------------------------------------: | :--------------: |
|      success      |               表明成功返回               |     所有API      |
|     name_null     |              空用户名                    |       注册       |
|     email_null    |              空邮箱                     |        注册       |
|     email_format_error    |      错误的邮箱格式              |       注册        |
|    email_exist    |               邮箱已被使用               |       注册       |
|  username_exist   |              用户名已被使用              | 注册、更改用户名 |
| username_notexist |               用户名不存在               |       登陆       |
|  password_error   |                 密码错误                 |       登陆       |
|     no_this_id    |              请求的id不存在              | 获取用户信息     |
|     not_login     |                  未登录                  | 获取用户信息、点赞、取消点赞、发布文章、修改菜单  |
|     like_exist    |              已经对该对象点赞过了        |        点赞     |
|   like_not_exist  |              不能取消没有的点赞          | 取消点赞     |
|  no_this_content  |              点赞、取消点赞的对象不存在  | 点赞、取消点赞     |
| user_content_id_not_matching |	更新的内容不是本用户发布的	 |     更新内容    |
|  access_denied    |              用户无访问权限              |  修改菜单     |
|      bad_req      | 错误的请求信息，代表请求json文件格式有误 | 所有POST类型API  |

- 注意：所有GET类型默认返回success状态，错误将在http状态码中体现

## User
### 用户注册

```
POST /api/user/register
```

#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| username    | string | 用户名        |
| email       | string | 邮箱          |
| password    | string | 密码          |

* 参数使用json形式提交

##### Example

```json
{
	"username": "PhilipGUO",
	"email": "1155124399@link.cuhk.edu.hk",
	"password": "123456"
}
```

#### Response

> Status: 201 Created
>
> Location: /api/user/register

| 参数名 |  类型  | 描述 |                    参数                    |
| :----: | :----: | :--: | :----------------------------------------: |
| State  | string | 状态 | success,email_exist,username_exist,bad_req |
|  Data  | string | 数据 |                    暂无                    |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```

### 用户登录

```
POST /api/user/login
```

#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| username    | string | 用户名        |
| password    | string | 密码          |

* 参数使用json形式提交

##### Example

```json
{
	"username": "PhilipGUO",
	"password": "123456"
}
```

#### Response

> Status: 200 OK
>
> Location: /api/user/login

| 参数名 |  类型  | 描述 |                       参数                        |
| :----: | :----: | :--: | :-----------------------------------------------: |
| State  | string | 状态 | success, username_notexist,password_error,bad_req |
|  Data  | string | 令牌 |                       暂无                        |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
  "Data":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg0NTE0OTAsIm5hbWUiOiJzdW5oYW9uYW4iLCJwYXNzd29yZCI6IjEyMzQ1NiJ9.XfEv5awYf7sw6b6wrgiiz691MKGx-sCYKY1FwgaKemQ"
}
```

### 退出登录

```
POST /api/user/logout
```

#### Request

空


##### Example

空

#### Response

> Status: 200 OK
>
> Location: /api/user/logout

| 参数名 |  类型  | 描述 |       参数       |
| :----: | :----: | :--: | :--------------: |
| State  | string | 状态 | success, bad_req |
|  Data  | string | 数据 |       暂无       |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
  "Data":""
}
```


### 更新用户名

```
POST /api/user/name
```
* Token required
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| name        | string | 用户名        |

* 参数使用json形式提交

##### Example

```json
{
	"name": "PhilipGUO"
}
```

#### Response

> Status: 200 OK
>
> Location: /api/user/name

| 参数名 |  类型  | 描述 |              状态              |
| :----: | :----: | :--: | :----------------------------: |
| State  | string | 状态 | success,username_exist,bad_req |
|  Data  | string | 数据 |              暂无              |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
  "Data":""
}
```


### 获取用户信息

```
GET /api/user/info/{userID:string}
```

* userID string 用户id(user_id="self"时，获取自身信息)
#### Request

空

##### Example

空

#### Response

> Status: 200 OK
>
> Location: /api/user/info/self
> 
| 参数名 |  类型  | 描述 |              状态              |
| :----: | :----: | :--: | :----------------------------: |
| State  | string | 状态 | success,not_login,bad_req,no_this_id |
|    ID     | string |   用户ID    |              暂无              |
|    name      |   string   |    用户名     |              暂无              |
|    email    |   string   |     邮箱      |              暂无              |
|    type     | string |   用户类型    |              暂无              |

* 参数使用json形式解析

##### Example
```json
{
  "State":"success",
  "ID": "5fbcb442f5beb22628d4b685",
  "name": "PhilipGUO",
	"email": "1155124399@link.cuhk.edu.hk",
	"type" : "admin"
}
```

## Content

### 获取指定内容

```
GET /api/content/detail/{contentID:string}
```

* contentID string 内容id
#### Request

空

##### Example

空

#### Response

> Status: 200 OK
>
> Location: /api/content/detail/5c3774187a2bdd000111e10c

| 参数名      | 类型   | 描述          |
| :---------: | :----: | :-----------: |
| State       | string | 状态          |
| Data        | dictionary | 内容信息  |
| User        | dictionary | 用户信息  |
| Data.ID | string | 文章ID |
| Data.name | string | 标题 |
| Data.detail | string | 内容 |
| Data.ownID | string | 发布者ID |
| Data.publishDate | string | 发布时间 |
| Data.likeNum | int | 点赞数 |
| Data.tag | array | 标签数组 |
| User.name | string | 用户名 |
| User.type | string | 用户类型 |
* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": {
  "ID": "5c3774187a2bdd000111e10c",
  "name": "test",
  "detail": "test content",
  "ownID": "5b3510fe7a2bdd4aac29eb73",
  "publishDate": "2021/4/9 10:00:00",
  "likeNum": 10,
  "tag": []
 },
 "User": {
  "name": "Test user",
  "type": "user"
 }
}
```

### 删除指定内容

```
DELETE /api/content/{contentID:string}
```

* contentID string 内容id
#### Request

空

##### Example

空

#### Response

> Status: 204 No Content
>
> Location: /api/content/5c3774187a2bdd000111e10c

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data        | string | 数据          |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
	"Data": ""
}
```


### 获取公共内容

```
GET /api/content/public
```

#### Parameters

| 字段     | 类型   | 描述   |
| -------- | ------ | ------ |
| page     | number | 页码   |
| per_page | number | 页大小 |

#### Response

> Status: 200 OK
>
> Location: /api/content/public?page=1&per_page=2

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data        | array  | 内容信息数组  |
| DataItem    | dictionary | 内容信息数组项 |
| DataItem.Data | dictionary | 内容信息  |
| DataItem.User | dictionary | 用户信息  |


* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": [
  {
   "Data": {
    "ID": "5c3774187a2bdd000111e10c",
    "name": "test",
    "detail": "test content",
    "ownID": "5b3510fe7a2bdd4aac29eb73",
    "publishDate": "2021/4/9 10:00:01",
    "likeNum": 10,
    "tag": []
   },
   "User": {
    "name": "Test user",
    "type": "user"
   }
  },
  {
    "Data": {
    "ID": "5c3774187a2bdd000111e10d",
    "name": "announcement",
    "detail": "announcement detail",
    "ownID": "5b3510fe7a2bdd4aac29eb74",
    "publishDate": "2021/4/9 10:00:00",
    "likeNum": 1,
    "tag": []
   },
   "User": {
    "name": "PhilipGUO",
    "type": "admin"
   }
  }
 ]
}
```

### 获取指定用户的所有内容

```
GET /api/content/texts/{userID:string}
```

* userID string 用户id(user_id="self"时，获取自身信息)

#### Parameters

| 字段     | 类型   | 描述   |
| -------- | ------ | ------ |
| page     | number | 页码   |
| per_page | number | 页大小 |

#### Response

> Status: 200 OK
>
> Location: /api/content/texts/5c3774187a2bdd000111e10c?page=1&per_page=2

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data        | array  | 内容信息数组  |

* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": [
  {
   "ID": "5b35115a7a2bdd4aac29eb74",
   "name": "test 1",
   "detail": "test content 1",
   "ownID": "5b3510fe7a2bdd4aac29eb73",
   "publishDate": "2021/4/9 10:00:02",
   "likeNum": 2,
   "tag": []
  },
  {
    "ID": "5c3774187a2bdd000111e10c",
    "name": "test 2",
    "detail": "test content 2",
    "ownID": "5b3510fe7a2bdd4aac29eb73",
    "publishDate": "2021/4/9 10:00:01",
    "likeNum": 10,
    "tag": []
  }
 ]
}
```

### 更新文本内容

```
POST /api/content/update
```

#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| contentID   | string | 内容ID        |
| name        | string | 文章标题      |
| detail      | string | 正文          |
| tags        | array  | 标签          |

* 参数使用json形式提交

##### Example

```json
{
    "contentID":"5fda52e2619fcb15076f9b0c",
    "name": "test",
	  "detail": "test content",
    "tags":["tag1","tag2"]
}
```

#### Response

> Status: 201 Created
>
> Location: /api/content/update

| 参数名 |  类型  | 描述 |           参数           |
| :----: | :----: | :--: | :----------------------: |
| State  | string | 状态 | success,not_login,bad_req,user_content_id_not_matching |
|  Data  | string | 数据 |           暂无           |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
	"Data": ""
}
```

### 发布新文章

```
POST /api/content/publish
```

#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| Name        | string | 标题          |
| detail      | string | 正文          |
| tags        | array  | 标签          |
* 参数使用json形式提交

##### Example

```json
{
  "Name": "test",
	"detail": "test content",
  "tags":["tag"],
}
```

#### Response

> Status: 201 Created
>
> Location: /api/content/publish

| 参数名 |  类型  | 描述 |           参数           |
| :----: | :----: | :--: | :----------------------: |
| State  | string | 状态 | success,not_login,bad_req |
|  Data  | string | 数据 |           暂无           |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
	"Data": ""
}
```


## Like
### 获取用户点赞列表
```
GET /api/like/{contentID}
```
* contentID string 内容id

#### Response

> Status: 200 OK
>
> Location: /api/like/5c3765bd7a2bdd000111e107

|  参数名  |  类型  |   描述   |       参数       |
| :------: | :----: | :------: | :--------------: |
|  State   | string |   状态   |success,no_this_content|
|   Data   | array  | 点赞列表 |       暂无       |
| DataItem | string |  用户名  |       暂无       |


* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": [
     "xiaoming",
     "xiaohong"
 ]
}
```
### 对某个内容点赞
```
POST /api/like/{contentID}
```
* contentID string 内容id
#### Request

空

##### Example

空
#### Response

> Status: 202 Accepted
>
> Location: /api/like/5c3765bd7a2bdd000111e107

| 参数名 |  类型  | 描述 |       参数       |
| :----: | :----: | :--: | :--------------: |
| State  | string | 状态 | success, not_login,like_exist,bad_req |
|  Data  | string | 数据 |       暂无       |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
	"Data": ""
}
```

### 取消用户对某个内容的点赞
```
PATCH /api/like/{contentID}
```
* contentID string 内容id
#### Request

空

##### Example

空

#### Response

> Status: 204 No Content
>
> Location: /api/like/5c3765bd7a2bdd000111e107

| 参数名 |  类型  | 描述 |       参数       |
| :----: | :----: | :--: | :--------------: |
| State  | string | 状态 | success,not_login,like_not_exist, bad_req |
|  Data  | string | 数据 |       暂无       |

* 参数使用json形式解析

##### Example
```json
{
	"State": "success",
	"Data": ""
}
```

## Menu

###  

###

###

## Record

### 查看

### 新增