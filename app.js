let ax, ay, az;

function checkForm() {
  // ダンベルカールのフォーム判定
  const axThresholdCurlMin = -10;
  const axThresholdCurlMax = 10;
  const ayThresholdCurlMin = 0;
  const ayThresholdCurlMax = 90;
  const azThresholdCurlMin = -10;
  const azThresholdCurlMax = 10;
  const CorrectCurl = (
    ax >= axThresholdCurlMin && ax <= axThresholdCurlMax &&
    ay >= ayThresholdCurlMin && ay <= ayThresholdCurlMax &&
    az >= azThresholdCurlMin && az <= azThresholdCurlMax
  );

  // クランチのフォーム判定
  const axThresholdCrunchMin = -30;
  const axThresholdCrunchMax = 30;
  const ayThresholdCrunchMin = 0;
  const ayThresholdCrunchMax = 1000;
  const azThresholdCrunchMin = 0;
  const azThresholdCrunchMax = 1000;
  const CorrectCrunch = (
    ax >= axThresholdCrunchMin && ax <= axThresholdCrunchMax &&
    ay >= ayThresholdCrunchMin && ay <= ayThresholdCrunchMax &&
    az >= azThresholdCrunchMin && az <= azThresholdCrunchMax
  );

  // ディップスのフォーム判定
  const axThresholdDipsMin = -20;
  const axThresholdDipsMax = 20;
  const ayThresholdDipsMax = 90;
  const azThresholdDipsMin = -30;
  const azThresholdDipsMax = 30;
  const CorrectDips = (
    ax >= axThresholdDipsMin && ax <= axThresholdDipsMax &&
    ay <= ayThresholdDipsMax &&
    az >= azThresholdDipsMin && az <= azThresholdDipsMax
  );

  // 各フォームに対応するメッセージの表示
  if (CorrectCurl) {
    showMessage(document.getElementById('msg1'), '成功！正しいフォームです。');
  } else {
    showMessage(document.getElementById('msg1'), '惜しい！');
  }

  if (CorrectCrunch) {
    showMessage(document.getElementById('msg2'), '成功！正しいフォームです。');
  } else {
    showMessage(document.getElementById('msg2'), '惜しい！');
  }

  if (CorrectDips) {
    showMessage(document.getElementById('msg3'), '成功！正しいフォームです。');
  } else {
    showMessage(document.getElementById('msg3'), '惜しい！');
  }
}

function showMessage(element, message) {
  element.innerHTML = message;
}

function requestDeviceMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          // iOS 13以降
          window.addEventListener('devicemotion', (event) => {
            // データの取得
            const ret = event.accelerationIncludingGravity;
            // データの処理
            ax = ret.x;
            ay = ret.y;
            az = ret.z;
            // フォームの判定とメッセージ表示
            checkForm();
          });
        } else {
          alert('加速度データへのアクセスが拒否されました。');
        }
      })
      .catch(console.error);
  } else {
    // iOS 12以前
    window.addEventListener('devicemotion', (event) => {
      // データの取得
      const ret = event.accelerationIncludingGravity;
      // データの処理
      ax = ret.x;
      ay = ret.y;
      az = ret.z;
      // フォームの判定とメッセージ表示
      checkForm();
    });
  }
}

// デバイスモーションの許可要求
requestDeviceMotionPermission();