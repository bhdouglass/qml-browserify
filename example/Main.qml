import QtQuick 2.4
import QtQuick.Window 2.2
import 'bundle.js' as Bundle

Window {
  id: root

  width: 200
  height: 60
  visible: true

  property var arr: [1, 1, 2, 2, 3, 3]

  Timer {
    id: timer
    property var callback: function() {}
    interval: 500
    running: false
    repeat: false
    onTriggered: {
      console.log('timer');
      timer.callback();
    }
  }

  Component.onCompleted: {
    Bundle.setupTimeout(timer);
  }

  Text {
    id: duplicated

    height: 30
    anchors {
      top: parent.top
      right: parent.right
      left: parent.left
    }

    text: 'Array: ' + JSON.stringify(arr)
  }

  Rectangle {
    color: 'grey'

    height: 30
    anchors {
      top: duplicated.bottom
      right: parent.right
      left: parent.left
    }

    Text {
      anchors.centerIn: parent
      text: 'Deduplicate!'
    }

    MouseArea{
        anchors.fill: parent

        onClicked: arr = Bundle.modules.uniq(arr)
    }
  }
}
