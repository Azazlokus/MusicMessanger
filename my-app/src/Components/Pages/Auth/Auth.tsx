import React, {SyntheticEvent} from 'react';
import logo from '../../../Img/Logo.png';
import './Auth.css';
import MyInput from "../../UI/Input/MyInput";
import MyButton from "../../UI/Button/MyButton";
import { collection, setDoc, doc } from "firebase/firestore";
import {IUserData} from "../../../Type";
import MySelect from "../../UI/MySelect/MySelect";
import bigLogo from "../../../Img/BigLogo.png";
import ava from '../../../Img/Avatar.png'
import {updateProfile,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {useAuth} from "../../Provider/useAuth";

const Auth = () => {
    // State для переключателя формы
    const [regForm, setRegForm] = React.useState(false)
    const {gAuth, base} = useAuth()
    /**
     * Переключатель для формы авторизации и регистрации
     */
    function handleReg() {
        if (regForm) {
            setRegForm(false)
        } else {
            setRegForm(true)
        }
    }

    /**
     * Это state который хранит в себе данные введенные пользователем
     */
    const [userData, setUserData] = React.useState<IUserData>({
        email: '',
        password: '',
        name: '',
    } as IUserData)

    /**
     * Функция логина и регистрации
     */
    const login = async (e: SyntheticEvent<HTMLFormElement>)=> {
        e.preventDefault()

        if(regForm){
            try {
                const res = await createUserWithEmailAndPassword(gAuth, userData.email, userData.password)
                await updateProfile(res.user,{
                    displayName: userData.name
                })
                try {
                    await setDoc(doc(base, "users", res.user.uid), {
                        name: userData.name,
                        _id: res.user.uid,
                        avatar: ava,
                        follow: []
                    });

                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            catch (error) {
                alert('Error')
            }
        }else{
            try {
                await signInWithEmailAndPassword(gAuth, userData.email, userData.password)
            }
            catch (error) {
                alert(error)
            }
        }
    }


    return (
        <>
            {!regForm && (
                <div className={'auth__wrapper'}>
                    <form onSubmit={login} className={'auth__container'}>
                        <img className={'auth__logo'} src={logo} alt={'Logo'}/>

                        <div className={'auth__title'}>
                            <h1 className={'auth__title_welcome'}>welcome to</h1>
                            <h1 className={'auth__title_name'}>chat</h1>
                        </div>

                        <div className={'auth__inputs'}>
                            <MyInput value={userData.email}
                                     onChange={(e: any) => setUserData({...userData, email: e.target.value})}
                                     title={'email'} type={'email'}/>
                            <MyInput value={userData.password}
                                     onChange={(e: any) => setUserData({...userData, password: e.target.value})}
                                     type={'password'} title={'password'}/>
                        </div>

                        <div className={'auth__btn'}>
                            <MyButton buttonText={'log in'} type={'submit'}/>
                            <MyButton onClick={handleReg} buttonText={'REGISTRATION'}/>
                        </div>
                    </form>
                </div>
            )}
            {regForm && (
                <div className={'reg__wrapper'}>
                    <form onSubmit={login} className={'reg__content'}>
                        <img className={'reg__logo'} src={logo} alt={'Logo'}/>

                        <div className={'reg__title'}>
                            <h1 className={'reg__title_welcome'}>sign up to</h1>
                            <h1 className={'reg__title_name'}>chat</h1>
                        </div>

                        <div className={'reg__inputs'}>
                            <MyInput
                                value={userData.name}
                                onChange={(e:any) => setUserData({...userData, name: e.target.value})}
                                placeholder={'Jonh2002'}
                                type={'text'}
                                title={'user name'}/>
                            <MyInput
                                value={userData.email}
                                onChange={(e: any) => setUserData({...userData, email: e.target.value})}
                                placeholder={'John@002@gmail.com'}
                                type={'email'}
                                title={'email'}/>
                            {/*<MySelect title={'gender'}/>*/}
                            {/*<MyInput type={'date'} title={'date of birthday'}/>*/}
                            {/*<MyInput placeholder={'+79453423567'} type={'phone'} title={'phone'}/>*/}
                            <MyInput
                                value={userData.password}
                                onChange={(e: any) => setUserData({...userData, password: e.target.value})}
                                placeholder={'ZffweeWe123'}
                                type={'password'}
                                title={'password'}/>
                        </div>

                        <div className={'reg__btn'}>
                            <MyButton type={'submit'} buttonText={'registration'}/>
                            <MyButton onClick={handleReg} buttonText={'log in'}/>
                        </div>
                    </form>

                    <div className={'reg__other'}>
                        <img src={bigLogo} alt={'Big Logo'}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;