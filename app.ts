var express = require('express');
var routes = require('./routes/index');
var user = require('./routes/user');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var http = require('http');
var path = require('path');
var url = require('url');
var multer = require('multer');
var upload = multer({ dest: './upload/' });
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ exteded: false }));
app.use(express.cookieParser('long-long-long-secret-string-1313513tefgwdsvbjkvasd'));
app.use(express.session({
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd',
}));
app.use(express.methodOverride());
app.use(app.router);

var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//회원관리 부분
/*
 1. 회원가입 
 2. 로그인   
 3. 로그아웃 
*/
app.get('/users/new',  auth.notNeedNew, user.usernew); //회원가입 전환
app.post('/users/new', user.usernewtry); //회원가입시도

app.get('/signin', user.signin); //로그인창 전환
app.post('/signin', user.signintry); //로그인시도

app.get('/logout', user.logout);//로그아웃



//ftp 부분
/*
 1. 초기디렉토리 (로그아웃 상태에서도 보이기.)
 2. 디렉토리 이동 (로그아웃 상태에서는 로그인 창으로 전환)
 3. 파일 다운로드 (로그아웃 상태에서는 로그인 창으로 전환)
*/
app.get('/', routes.index); //처음 디렉토리 띄우기

app.post('/firstpre',  auth.authlogin, routes.firstpre); //처음상위 디렉토리로 이동
app.post('/pre',  auth.authlogin, routes.pre); //두번쨰

app.post('/download/:file',  auth.authlogin, routes.download); //파일 다운로드
app.post('/move/:dir',  auth.authlogin, routes.crime); //하위 디렉토리 이동

app.post('/dircreate', auth.authlogin, routes.create); //디렉토리 추가
app.post('/upload',  auth.authlogin, upload.single('file'), routes.upload); //파일 업로드



//관리자 권한(lv.1이상) 기능
/*
 1. 유저리스트 (lv.1이상) 열람 가능
 2. 유저검색 (lv.1이상) 검색 가능
 3. 권한검색 (lv.2이상) 검색가능
 4. 유저 삭제 //delete
 5. 유저 권한 상승(최고 lv.1까지) update set auth=1 WHERE id=id; (계정및 비밀번호로 검사한다) - 최고권한자(lv.2)만 
 6. 유저 권한 하락(최하 lv.0까지) update set auth=0 WHERE id=id; (계정및 비밀번호로 검사한다) - 최고권한자(lv.2)만 
 7. 파일 삭제 (lv.1이상) 삭제 가능
*/
/*1*/app.get('/admin/users/list', auth.authlogin, auth.authAdmin, admin.userlist); //유저리스트
/*2*/app.post('/admin/users/searchid', auth.authlogin, auth.authAdmin, admin.usersearchid);//유저검색
/*2*/app.post('/admin/users/searchlv', auth.authlogin, auth.authAdmin, admin.usersearchlv);//권한검색
/*4*/app.get('/admin/users/del/:deluser', auth.authlogin, auth.authAdmin, admin.userdel); //유저삭제
/*5*/app.get('/admin/users/levelup/:levelupuser', auth.authlogin, auth.authAdmin, admin.userlevelup); //유저권한상승
/*6*/app.get('/admin/users/leveldown/:leveldownuser', auth.authlogin, auth.authAdmin, admin.userleveldown); //유저권한하락
/*7*/app.post('/admin/file/delete/:delfile', auth.authlogin, auth.authAdmin, admin.filedelete);  //파일삭제



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//# sourceMappingURL=app.js.map
