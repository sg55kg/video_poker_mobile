import { StyleSheet, Text, View } from 'react-native'

const Table = ({ betAmount }) => {
    const BET_ONE_MULTIPLIERS = [250,55,400,160,160,80,50,9,5,4,3,1,1]
    const BET_TWO_MULTIPLIERS = [500,110,800,320,320,160,100,18,10,8,6,2,2]
    const BET_THREE_MULTIPLIERS = [750,165,1200,480,480,240,150,27,15,12,9,3,3]
    const BET_FOUR_MULTIPLIERS = [1000,220,1600,640,640,320,200,36,20,16,12,4,4]
    const BET_FIVE_MULTIPLIERS = [4000,275,2000,800,800,400,250,45,25,20,15,5,5]

    return (
        <View style={tableStyle.container}>
            <View style={tableStyle.labelColumn}>
                <Text style={tableStyle.text}>ROYAL FLUSH</Text>
                <Text style={tableStyle.text}>STRAIGHT FLUSH</Text>
                <Text style={tableStyle.text}>FOUR ACES + 2 THRU 4</Text>
                <Text style={tableStyle.text}>FOUR 2 THRU 4 + A THRU 4</Text>
                <Text style={tableStyle.text}>FOUR ACES + 5 THRU K</Text>
                <Text style={tableStyle.text}>FOUR 2 THRU 4 + 5 THRU K</Text>
                <Text style={tableStyle.text}>FOUR 5 THRU K</Text>
                <Text style={tableStyle.text}>FULL HOUSE</Text>
                <Text style={tableStyle.text}>FLUSH</Text>
                <Text style={tableStyle.text}>STRAIGHT</Text>
                <Text style={tableStyle.text}>THREE OF A KIND</Text>
                <Text style={tableStyle.text}>TWO PAIR</Text>
                <Text style={tableStyle.text}>JACKS OR BETTER</Text>
            </View>
            <View style={betAmount && betAmount === 1 ? {...tableStyle.multiplierColumn, ...tableStyle.selectedColumn} : tableStyle.multiplierColumn}>
                {BET_ONE_MULTIPLIERS.map((value, index) => {
                    return (
                        <Text key={value * 2 + index } style={tableStyle.text}>{value}</Text>
                    )
                })}
            </View>
            <View style={betAmount && betAmount === 2 ? {...tableStyle.multiplierColumn, ...tableStyle.selectedColumn} : tableStyle.multiplierColumn}>
                {BET_TWO_MULTIPLIERS.map((value, index) => {
                    return (
                        <Text key={value * 2 + index } style={tableStyle.text}>{value}</Text>
                    )
                })}
            </View>
            <View style={betAmount && betAmount === 3 ? {...tableStyle.multiplierColumn, ...tableStyle.selectedColumn} : tableStyle.multiplierColumn}>
                {BET_THREE_MULTIPLIERS.map((value, index) => {
                    return (
                        <Text key={value * 2 + index} style={tableStyle.text}>{value}</Text>
                    )
                })}
            </View>
            <View style={betAmount && betAmount === 4 ? {...tableStyle.multiplierColumn, ...tableStyle.selectedColumn} : tableStyle.multiplierColumn}>
                {BET_FOUR_MULTIPLIERS.map((value, index) => {
                    return (
                        <Text key={value * 2 + index } style={tableStyle.text}>{value}</Text>
                    )
                })}
            </View>
            <View style={betAmount && betAmount === 5 ? {...tableStyle.multiplierColumn, ...tableStyle.selectedColumn} : tableStyle.multiplierColumn}>
                {BET_FIVE_MULTIPLIERS.map((value, index) => {
                    return (
                        <Text key={value * 2 + index } style={tableStyle.text}>{value}</Text>
                    )
                })}
            </View>
        </View>
    )
}

export default Table

const tableStyle = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 5,
        height: 'auto',
        backgroundColor: 'rgb(2, 10, 124)',
        borderWidth: 2,
        borderColor: 'rgb(201, 204, 6)',
        flexDirection: 'row'
        
    },
    text: {
        color: 'rgb(201, 204, 6)',
        fontSize: 10,
        fontWeight: '700'
    },
    labelColumn: {
        flexDirection: 'column',
        flex: 4,
    },
    multiplierColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        flex: 1,
        borderLeftWidth: 2,
        borderLeftColor: 'rgb(201, 204, 6)',
        padding: 2
    },
    selectedColumn: {
        backgroundColor: 'rgb(172, 2, 25)'
    }
})