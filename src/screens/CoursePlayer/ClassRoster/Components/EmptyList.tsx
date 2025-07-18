import { _Text, _VectorIcons, _View } from '../../../../components'
import React, { FC } from 'react'
import CommonStyles from '../../../CommonStyles'
import { NoActiveStudent } from '../../../../../assets/Icons'
type Props = {
    loading: boolean
}

export const  EmptyList:FC<Props> = ({ loading = true }) => {
    return !loading && <_View justify='center' alignItems='center' marginTop={"50%"}>
         <NoActiveStudent />
        <_Text style={{ fontStyle: CommonStyles.fonts.bold, fontSize: 20,marginTop:180 }}>No Student(s) Enrolled</_Text></_View>
}