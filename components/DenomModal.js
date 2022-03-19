import { Modal, Pressable, Text, View } from 'react-native'

const DenomModal = ({ showDenomModal, setShowDenomModal }) => {
    return (
        <Modal
            animationType="slide"
            view={showDenomModal}
            onRequestClose={() => setShowDenomModal(false)}
            transparent={true}
            supportedOrientations={['landscape']}
        >
            <View style={{ alignSelf: 'center', margin: 'auto', backgroundColor: 'red', width: '90%', height: '90%' }}>
                <Pressable onPress={() => setShowDenomModal(false)}>
                    <Text>Close</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default DenomModal