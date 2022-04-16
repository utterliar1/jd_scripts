const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const root = path.resolve(__dirname, '../');


let files =[

]

var srcDir = 'D:/workspace/github/jd_scripts-1/config';
var tarDirs = [
'D:/workspace/github/atyvcn/config',
'D:/workspace/github/Aaron/config',
'D:/workspace/github/DovFork/config',
'D:/workspace/github/helloword/config',
'D:/workspace/github/jsbug-master/config',
'D:/workspace/github/LostInsight/config',
'D:/workspace/github/pkpkgtr1/config',
]
tarDirs.forEach(function(tarDir){
	copyFiles(srcDir,tarDir,'',true);
})

// copyFiles(srcDir,'D:/workspace/github/Aaron/config','',true);

function copyFiles(srcDir,targetDir,fileList,copyDir){
	fs.exists(targetDir, (exists) => {
	  if (!exists) {
	  	console.log('创建目录:'+targetDir)
	    fs.mkdir(targetDir, (exists) => {
	    	doCopying(srcDir,targetDir,fileList,copyDir);
	    })
	  } else {
	    doCopying(srcDir,targetDir,fileList,copyDir);
	  }
	})
}

function doCopying(srcDir,targetDir,fileList,copyDir){
	if (!fileList||!fileList.length<=0) {
		fileList = fs.readdirSync(path.resolve(srcDir, './'))
	}
	console.log('复制目录'+srcDir+'-->'+targetDir)

	fileList.forEach(function( path ){
	    var _src = srcDir + '/' + path,
	        _dst = targetDir + '/' + path,
	        readable, writable;      

	    fs.stat( _src, function( err, st ){
	        if( err ){ throw err; }

	        // 判断是否为文件
	        if( st.isFile() ){
	            // 创建读取流
	            readable = fs.createReadStream( _src );
	            // 创建写入流
	            writable = fs.createWriteStream( _dst ); 
	            // 通过管道来传输流
	            readable.pipe( writable );
	        }
	        // 如果是目录则递归调用自身
	        else if( st.isDirectory() && copyDir ){
	            copyFiles( _src, _dst, '' ,true);
	        }
	    });
	});	
}