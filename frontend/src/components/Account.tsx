/* eslint-disable react-hooks/exhaustive-deps */
import PswdButton from './PswdBtn'
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { useEffect, useState } from 'react'

const Account: React.FC = () => {
  const {
    user, setUser, validUser, userRef,
    btnLoading, handleUsername, validPswd,
    pswd, confirmPswd, currentPswd, showPswd,
    setPswd, setCurrentPswd, setShowPswd,
    setConfirmPswd, editPassword, toggles,
    setToggles, notify, token }: any = useAuth();

  const [disabled, setDisabled] = useState<any>(false)

  useEffect(() => {
    setDisabled(toggles.disabled)
  }, [toggles])

  const handleDisability = async (): Promise<void> => {
    await axios.post(
      '/settings/tg-disability',
      { tgDisability: !disabled },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        localStorage.setItem('toggles', JSON.stringify(toggles))
        setDisabled(!disabled)
        setToggles((prev: any) => {
          return { ...prev, disabled: !disabled }
        })
        console.log(res?.data)
    }).catch((err: any) => {
      notify(err.response?.data?.action, err.response?.data?.msg)
    })
  }

  const isValidToEditPswd: boolean = Boolean(currentPswd) && Boolean(validPswd)

  return (
    <main className="mb-10">
      <section>
        <article>
          <form onSubmit={(e) => e.preventDefault()} className="form-itself">
            <h1 className="form-h1 md:text-4xl">
              Edit Username
            </h1>
            <article className="mt-5 form-center">
              <div className="form-group">
                  <label htmlFor="user">Username</label>
                  <input type="text" id="user"
                      autoComplete="off"
                      placeholder="kawojue_"
                      className={`border-2 ${validUser ?
                      'border-green-400' : 'border-red-400'}`}
                      value={user} ref={userRef}
                      onChange={e => setUser(e.target.value)}
                      aria-invalid={validUser ? "false" : "true"}
                      aria-describedby="uidnote" max={89} />
              </div>
              <button
                    className="btn" disabled={!validUser}
                    onClick={async () => await handleUsername()}>
                        {btnLoading ? 'Editing...' : 'Save'}
                    </button>
            </article>
          </form>
        </article>
        <form onSubmit={(e) => e.preventDefault()} className="form-itself">
            <h1 className="form-h1 md:text-4xl">
              Change Password
            </h1>
            <article className="mt-5 form-center">
              <div className="form-group">
                <label>Current Password</label>
                <div className="pswd-container">
                    <input className='border-2'
                    value={currentPswd} type='password'
                    onChange={(e) => setCurrentPswd(e.target.value)}
                    aria-describedby="uidnote" />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="pswd-container">
                    <input max={32} value={pswd}
                    onChange={(e) => setPswd(e.target.value)}
                    type={`${showPswd ? 'text': 'password'}`}
                    className={`border-2 ${validPswd ?
                    'border-green-400' : 'border-red-400'}`}
                    aria-invalid={validPswd ? "false" : "true"}
                    aria-describedby="uidnote" />
                    <PswdButton get={showPswd} set={setShowPswd} />
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="pswd-container">
                    <input max={32} value={confirmPswd}
                    type='password' aria-describedby="uidnote"
                    onChange={(e) => setConfirmPswd(e.target.value)}
                    className={`border-2 ${validPswd ?
                    'border-green-400' : 'border-red-400'}`}
                    aria-invalid={validPswd ? "false" : "true"} />
                </div>
                </div>
              <button className="btn" disabled={!isValidToEditPswd}
              onClick={async () => await editPassword()}>
                {btnLoading ? 'Encrypting...' : 'Change'}
              </button>
            </article>
          </form>
        <article className="mt-10 form-itself">
          <div className="toggle-container">
            <h2 className="toggle-h2 text-red-400">
              Disable Account
            </h2>
            <label className="switch">
              <input type="checkbox" value={disabled} checked={disabled}
              onChange={async () => await handleDisability()}/>
              <span className="slider round"></span>
            </label>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Account