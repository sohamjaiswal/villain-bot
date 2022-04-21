import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
export const uploadImage = async (imageLoc: string) => {
    const file: Buffer = fs.readFileSync(imageLoc)
    console.log(file)
    const form = new FormData()
    console.log(form)
    form.append('file', file)
    const link = await axios.post('https://media.guilded.gg/media/upload',
        form,
        {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params: { 'dynamicMediaTypeId': 'ContentMedia' }
        }
    )
}