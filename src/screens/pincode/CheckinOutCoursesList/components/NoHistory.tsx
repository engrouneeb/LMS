import React, { FC } from 'react'
import { _Text, _VectorIcons, _View } from '../../../../components'
import { whiteThemeColors } from '../../../../Utilities/colors'
import { styles } from '../styles'

export const  NoHistory:FC<{loading:boolean}>=({loading})=> {
    return(loading?<></>:
        <_View style={{marginTop:150,justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
           <_VectorIcons
               type={'MaterialCommunityIcons'}
               name={'history'}
               size={50}
               color={whiteThemeColors.primary}
             />
             <_Text style={styles.descriptionText}>No History found</_Text>
         </_View>
       )
}