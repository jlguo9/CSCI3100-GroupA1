# API 设计文档

## 状态说明

|       状态        |                   说明                   |     应用API      |
| :---------------: | :--------------------------------------: | :--------------: |
|      success      |               表明成功返回               |     所有API      |
|     name_null     |              空用户名                    |       注册       |
|     email_null    |              空邮箱                     |        注册       |
|     password_null    |              密码为空                     |        注册       |
|    email_exist    |               邮箱已被使用               |       注册       |
|  username_exist   |              用户名已被使用              |        注册       |
|  auth_failed      |               用户名不存在或密码错误      |       登陆       |
|  wrong_password   |                 密码错误                 |       登陆    |
|     no_this_id    |              请求的id不存在              | 获取用户信息     |
|     not_login     |                  未登录                  | 获取用户信息、点赞、取消点赞、发布文章、修改菜单、购物车操作  |
|     like_exist    |              已经对该对象点赞过了        |        点赞     |
|   like_not_exist  |              不能取消没有的点赞          | 取消点赞     |
|  no_this_content  |              点赞、取消点赞的对象不存在  | 点赞、取消点赞     |
| user_content_id_not_matching |	更新或删除的内容不是本用户发布的	 |     更新内容、删除内容    |
|  access_denied    |              用户无访问权限              |  修改菜单     |
|  dish_not_exist    |              菜品不存在              |  删除菜品、修改菜品   |
|  item_not_exist    |              条目不存在              |  删除购物车条目  |
|  record_not_exist    |              该纪录不存在              |  删除纪录  |
|      bad_req      | 错误的请求信息，代表请求json文件格式有误 | 所有POST类型API  |


- \[REMINDER\]: please set json headers to be content-type.
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
| State  | string | 状态 | success,email_exist,username_exist,bad_req,etc. |
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
GET /api/user/login
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
| State  | string | 状态 | success, username_notexist,wrong_password,bad_req |
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
GET /api/user/logout
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


### 更改密码

```
PUT /api/user/password
```
* Token required
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| old_password        | string |   旧密码     |
| new_password        | string |   新密码     |

* 参数使用json形式提交

##### Example

```json
{
	"old_password": "1234",
  "new_password": "4321"
}
```

#### Response

> Status: 200 OK
>
> Location: /api/user/name

| 参数名 |  类型  | 描述 |              状态              |
| :----: | :----: | :--: | :----------------------------: |
| State  | string | 状态 | success,wrong_password,bad_req |
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

* userID string 用户id
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
|    canteen     | string |   用户所属餐厅（仅限manager）    |              暂无              |

* 参数使用json形式解析

##### Example
```json
{
  "State":"success",
  "Data":{
    "ID": "5fbcb442f5beb22628d4b685",
  "name": "PhilipGUO",
	"email": "1155124399@link.cuhk.edu.hk",
	"type" : "admin",
  "canteen": ""
  }
  
}
```

## Content

### 获取指定内容

```
GET /api/content/{contentID:string}
```

* contentID string 内容id
#### Request

空

##### Example

空

#### Response

> Status: 200 OK
>
> Location: /api/content/5c3774187a2bdd000111e10c

| 参数名      | 类型   | 描述          |
| :---------: | :----: | :-----------: |
| State       | string | 状态          |
| Data        | dictionary | 内容信息  |
| User        | dictionary | 用户信息  |
| Data.ID | string | 文章ID |
| Data.name | string | 标题 |
| Data.detail | string | 内容 |
| Data.ownID | string | 发布者ID |
| Data.timestamps | string | 发布时间 |
| Data.likeNum | int | 点赞数 |
| Data.canteen | string | 餐厅 |
| Data.dish | string | 食物 |
| Data.rating | int[1,5] | 评分 |
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
  "timestamps": //unix timestamp,
  "likeNum": 10,
  "canteen": "UC can",
  "dish": "three dishes",
  "rating": 4
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
GET /api/content/index
```

#### Parameters

| 字段     | 类型   | 描述   |
| -------- | ------ | ------ |
| page     | number | 页码   |
| per_page | number | 页大小 |

#### Response

> Status: 200 OK
>
> Location: /api/content/index?page=1&per_page=2

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
    "timestamps":, //unix timestamp
    "likeNum": 10,
    "canteen": "UC can",
    "dish": "three dishes",
    "rating": 4,
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
    "timestamps":, //unix timestamp,
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

### 更新文本内容

```
PUT /api/content/{contentID:string}
```
* contentID string 内容id
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| name        | string | 文章标题      |
| detail      | string | 正文          |

* 参数使用json形式提交

##### Example

```json
{
    "name": "test", 
    "detail": "test content"
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
| canteen        | string  | 餐厅       |
| dish        | string  | 食物       |
| rating        | int[1-5]  | 评分       |
* 参数使用json形式提交

##### Example

```json
{
  "Name": "test",
	"detail": "test content",
  "canteen": "UC can",
  "dish": "three dishes",
  "rating": 4
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
DELETE /api/like/{contentID:string}
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

###  获取所有菜品信息
```
GET /api/menu/index
```
#### Request

空

##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/menu/index

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data       | array |  内容信息数组         |
| DataItem       | dictionary |  内容信息数组项         |
| DataItem.ID       | string |  菜品ID          |
| DataItem.name      | string |  菜品名称       |
| DataItem.price       | float |  菜品价格      |
| DataItem.canteen       | string |  菜品所属餐厅     |
| DataItem.rating       | int[1,5] |  菜品评分        |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data":[
    {
      "ID": "1xasdasdw",
      "name": "three dishes",
      "price": 25.5,
      "canteen": "UC Can",
      "rating": 4
    },
    {
      "ID": "1xaqwdqw22w",
      "name": "test",
      "price": 27,
      "canteen": "NA Can",
      "rating": 4
    }

  ]
}
```

###  增加菜品
```
POST /api/menu/add
```
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| name      | string |  菜品名称       |
| price       | float |  菜品价格      |
| canteen       | string |  菜品所属餐厅   |
* 参数使用json形式提交

##### Example

```json
{
  "name": "test",
  "price": 25.5,
  "canteen": "UC can"
}
```
#### Response

> Status: 200 OK
>
> Location: /api/menu/add

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, access_denied, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```

###  删除菜品
```
DELETE /api/menu/{dishID:string}
```
#### Request

空
##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/menu/5c3765bd7a2bdd000111e
| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, access_denied, dish_not_exist, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
###  修改菜品
```
PUT /api/menu/{dishID:string}
```

#### Request
| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| name      | string |  菜品名称       |
| price       | float |  菜品价格      |
* 参数使用json形式提交

##### Example

```json
{
  "name": "test",
  "price": 25.5
}
```
#### Response

> Status: 200 OK
>
> Location: /api/menu/5c3765bd7a2bdd000111e

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, access_denied, dish_not_exist, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
##   Shopping Cart
###  获取所有条目
```
GET /api/cart/index
```
#### Request

空
##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/cart/index

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data        | array  | 内容信息数组  |
| DataItem    | dictionary | 内容信息数组项 |

* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": [
  {
      "ID": "asd22iwu2198",
      "dishID": "asdjxjoq1on",
      "name": "test",
      "price": 25.5,
      "canteen": "UC can",
      "number": "1"
  },
  {
      "ID": "asd22iasdkjn28",
      "dishID": "asasdasw221q1on",
      "name": "test2",
      "price": 28,
      "canteen": "NA can",
      "number": "2"
  }]
}
```

###  增加条目
```
POST /api/cart/add
```
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
|  ID       |   string | 菜品ID      |
| name      | string |  菜品名称       |
| price       | float |  菜品价格      |
| canteen      | string |  菜品所属餐厅   |
| number       |  int  |  数量    |
* 参数使用json形式提交

##### Example

```json
{
  "ID": "asdjxjoq1on",
  "name": "test",
  "price": 25.5,
  "canteen": "UC can",
  "number": "1"
}
```
#### Response

> Status: 200 OK
>
> Location: /api/cart/add

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
###  删除条目
```
DELETE /api/cart/{itemID:string}
```
* itemID string 购物车条目ID 
#### Request

空
##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/cart/5c376abbs2a2bdd000111e

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, item_not_exist, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
## Record

### 获取所有纪录
```
GET /api/record/index
```
#### Request

空
##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/record/index

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | 状态          |
| Data        | array  | 内容信息数组  |
| DataItem    | dictionary | 内容信息数组项 |

* 参数使用json形式解析

##### Example
```json
{
 "State": "success",
 "Data": [
  {
    "ID": "asd22iwu2198",
    "dishID": "asdjxjoq1on",
    "name": "test",
    "price": 25.5,
    "canteen": "UC can",
    "number": "1",
    "time": "2021/4/1 10:00:00"
  },
  {
    "ID": "asd22iasdkjn28",
    "dishID": "asasdasw221q1on",
    "name": "test2",
    "price": 28,
    "canteen": "NA can",
    "number": "2",
    "time": "2021/4/1 10:00:00"
  }]
}
```
### 增加纪录
```
POST /api/record/add
```
#### Request

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
|  ID       |   string | 菜品ID      |
| name      | string |  菜品名称       |
| price       | float |  菜品价格      |
| canteen      | string |  菜品所属餐厅   |
| number       |  int  |  数量    |
* 参数使用json形式提交

##### Example

```json
{
  "ID": "123abaabbcf212000e1",
  "name": "test",
  "price": 25.5,
  "canteen": "UC can",
  "number": "1"
}
```
#### Response

> Status: 200 OK
>
> Location: /api/record/add

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
### 删除纪录
```
DELETE /api/record/{recordID:string}
```
* recordID string 纪录ID 
#### Request

空
##### Example

空
#### Response

> Status: 200 OK
>
> Location: /api/cart/5c376abbs2a2bdd000111e

| 参数名      | 类型   | 描述          |
| ----------- | ------ | ------------- |
| State       | string | success,not_login, record_not_exist, bad_req    |
| Data      | string |   暂无          |

* 参数使用json形式解析

##### Example
```json
{
  "State": "success",
  "Data": ""
}
```
