using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.BLL
{
    public class UserLogin_bll
    {
        public bool LoginYes(string Account, string Password,out string roles)
        {
            UserInfo userInfo=new UserInfo();
            try
            {
                userInfo = User_dal.GetPswAndRoleAndSaltModel(Account);
            }
            catch (Exception e)
            {
                throw new Exception("查询出错 UserLogin_bll LoginYes");
            }

            string Salt = userInfo.salt;
            string realPassword = userInfo.passwords;
            //将盐值加在密码的后面，并转化为二进制
            byte[] pwdAndSaltBytes = System.Text.Encoding.UTF8.GetBytes(Password + Salt);
            //经过哈希算法加密后得到的二进制值
            byte[] hashBytes = new System.Security.Cryptography.SHA256Managed().ComputeHash(pwdAndSaltBytes);
            string hashPassword = Convert.ToBase64String(hashBytes);
            //判断密码是否正确
            roles = userInfo.roles;
            if (realPassword == hashPassword)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}