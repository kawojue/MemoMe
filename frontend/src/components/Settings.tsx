import CheckBox from './CheckBox'
import useAuth from '@/hooks/useAuth'
import axios from '@/pages/api/instance'
import { useState, useEffect } from 'react'
import { SpinnerTwo } from './Spinner'

const Settings: React.FC = () => {
  const { toggles, notify, token, btnLoading,
    throwError, setBtnLoading, updateToggle }: any = useAuth()

  const [pbMsg, setPbMsg] = useState<string>('')
  const [pbMedia, setPbMedia] = useState<any>(false)
  const [pbContent, setPbContent] = useState<any>(false)

  useEffect(() => {
    setPbMedia(toggles.pbMedia)
    setPbContent(toggles.pbContent)
  }, [toggles])

  const handleMedia = async (): Promise<void> => {
    setPbMedia(!pbMedia)
    await axios.post(
      '/settings/tg-media',
      { tgPbMedia: !pbMedia },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        updateToggle("pbMedia", pbMedia)
    }).catch((err: any) => {
      throwError(err)
    })
  }

  const handleContent = async (): Promise<void> => {
    setPbContent(!pbContent)
    await axios.post(
      '/settings/tg-content',
      { tgPbContent: !pbContent },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => updateToggle("pbContent", pbContent)).catch((err: any) => throwError(err))
  }

  const handleMsg = async (): Promise<void> => {
    setBtnLoading(true)
    await axios.post(
      '/settings/tg-msg',
      JSON.stringify({ pbMsg }),
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res: any) => {
      setPbMsg("")
      notify("success", "Updated successfully!")
    }).catch((err: any) => {
      throwError(err)
    }).finally(() => setBtnLoading(false))
  }

  return (
    <section className="mb-14">
      <form onSubmit={(e) => e.preventDefault()} className="card form-itself">
        <h1 className="form-h1 md:text-4xl">
          Edit Public Review
        </h1>
        <article className="mt-5 form-center">
          <div className="form-group">
              <textarea
              autoComplete="off"
              placeholder="Tell me what is on your mind?"
              className='content md:text-xl'
              value={pbMsg} maxLength={150}
              onChange={e => setPbMsg(e.target.value)} />
          </div>
          <button className="btn" disabled={!pbMsg}
          onClick={async () => await handleMsg()}>
            {btnLoading ? <SpinnerTwo /> : 'Save'}
            </button>
        </article>
      </form>
      <article className="card mt-10 form-itself">
        <div className="toggle-container">
          <h2 className="toggle-h2 text-clr-2">
            Recieve Media
          </h2>
          <CheckBox getter={pbMedia} setter={handleMedia} />
        </div>
      </article>
      <article className="card mt-10 form-itself">
        <div className="toggle-container">
          <h2 className="toggle-h2 text-clr-2">
            Recieve Texts
          </h2>
          <CheckBox getter={pbContent} setter={handleContent} />
        </div>
      </article>
    </section>
  )
}

export default Settings