import tkinter as tk
import tkinter.filedialog
import io
import sys

#改变标准输出的默认编码
sys.stdout= io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')

# 打开文件单选框，返回包函文件名的路径
dirPaths = tkinter.filedialog.askopenfilename()

# 打开文件多选框，以元组形式返回包函文件名的路径
# dirPaths = tkinter.filedialog.askopenfilenames()

# 打开文件单选框，返回文件流对象
# dirPaths = tkinter.filedialog.askopenfile()

# 打开文件多选框，以列表形式返回文件流对象
# dirPaths = tkinter.filedialog.askopenfiles()

# 选择以什么文件名保存文件，并返回文件名
# dirPaths = tkinter.filedialog.asksaveasfilename()

# 选择以什么文件名保存文件，并返回文文件流对象
# dirPaths = tkinter.filedialog.asksaveasfile()












# 选择目录，并返回目录名
# dirPaths = tkinter.filedialog.askdirectory()

# 打开一个保存文件的对话框
# dirPaths = tkinter.filedialog.SaveAs()

if(len(dirPaths) == 0):
  print('None')
else:
  print(dirPaths)

# const spawn=require('child_process').spawn
# const py = spawn('python',['a.py'])

# console.log('start…………')

# py.stdout.on('data',function(res){
#     let data = res.toString();
#     console.log('stdout: ',data)
# })
# py.stderr.on('data',function(res){
#     let data = res.toString();
#     console.log('stderr: ',data)
# })
# py.on('close', (code) => {
#   console.log(`子进程退出：退出代码code ${code}`);
# });

# console.log('end.')
