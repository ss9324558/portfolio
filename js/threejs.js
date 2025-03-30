document.addEventListener('DOMContentLoaded', () => {
    initRobotBuddy();
  });
  
  function initRobotBuddy() {
    const container = document.getElementById('threejs-container');
    if (!container) return;
  
    // **Container Styling (Soft Glow)**
    container.style.width = '600px';
    container.style.height = '450px';
    container.style.margin = '0 auto';
    container.style.border = '2px solid rgba(255, 105, 180, 0.23)';
    container.style.boxShadow = '0 0 30px rgba(255, 182, 193, 0.32)';
    container.style.borderRadius = '16px';
    container.style.overflow = 'hidden';
  
    // Clear previous scene
    container.innerHTML = '';
  
    // **1. Scene Setup (Dreamy Pastel Space)**
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff0f5); // Soft pink background
    scene.fog = new THREE.FogExp2(0xfff0f5, 0.005);
  
    // **2. Camera (Close-Up for Cuteness)**
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);
  
    // **3. Renderer (Soft and Warm)**
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
  
    // **4. Lighting (Soft and Warm)**
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.5);
    scene.add(ambientLight);
  
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(1, 2, 3);
    mainLight.castShadow = true;
    scene.add(mainLight);
  
    const pinkLight = new THREE.PointLight(0xff69b4, 2, 10);
    pinkLight.position.set(-2, 1, 2);
    scene.add(pinkLight);
  
    // **5. Create the Adorable Robot Buddy**
    const robot = new THREE.Group();
    scene.add(robot);
  
    // **A. Body (Round and Cute)**
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x87cefa, // Sky blue
      emissive: 0xadd8e6,
      emissiveIntensity: 0.3,
      specular: 0xffffff,
      shininess: 90
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    robot.add(body);
  
    // **B. Head (With Big Expressive Eyes)**
    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x87cefa,
      emissive: 0xadd8e6,
      emissiveIntensity: 0.2
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    robot.add(head);
  
    // **C. Eyes (Big and Shiny)**
    const eyeGeometry = new THREE.SphereGeometry(0.10, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 100
    });
  
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.55, 0.6);
    robot.add(leftEye);
  
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.55, 0.6);
    robot.add(rightEye);
  
    // Pupils (Make them extra cute)
    const pupilGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.25, 1.55, 0.65);
    robot.add(leftPupil);
  
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.25, 1.55, 0.65);
    robot.add(rightPupil);
  
    // // Eye highlights (for extra cuteness)
    // const highlightGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    // const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
    // const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    // leftHighlight.position.set(-0.3, 1.6, 0.66);
    // robot.add(leftHighlight);
  
    // const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    // rightHighlight.position.set(0.2, 1.6, 0.66);
    // robot.add(rightHighlight);
  
    // **D. Cheeks (Blushing!)**
    const cheekGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const cheekMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      transparent: true,
      opacity: 0.7
    });
  
    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.4, 1.4, 0.5);
    robot.add(leftCheek);
  
    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.4, 1.4, 0.5);
    robot.add(rightCheek);
  
    // **E. Smiling Mouth**
    const mouthGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 32, Math.PI);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.3, 0.6);
    mouth.rotation.z = Math.PI;
    robot.add(mouth);
  
    // **F. Antenna (With Floating Heart)**
    const antennaGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 2.2, 0);
    antenna.rotation.x = 0.3;
    robot.add(antenna);
  
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0.25, 0.25, 0.5, 0, 0.5, 0.25);
    heartShape.bezierCurveTo(0.5, 0.5, 0, 0.75, 0, 0.75);
    heartShape.bezierCurveTo(-0.5, 0.5, -0.5, 0.25, -0.5, 0.25);
    heartShape.bezierCurveTo(-0.5, 0, -0.25, 0.25, 0, 0);
  
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05
    });
  
    const heartMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      emissive: 0xff69b4,
      emissiveIntensity: 0.3
    });
  
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.position.set(0, 2.5, 0);
    heart.scale.set(0.3, 0.3, 0.3);
    robot.add(heart);
  
    // **G. Arms (With Waving Animation)**
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x87cefa });
  
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1, 0.5, 0);
    leftArm.rotation.z = 0.5;
    robot.add(leftArm);
  
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1, 0.5, 0);
    rightArm.rotation.z = -0.5;
    robot.add(rightArm);
  
    // Hands (Round and cute)
    // const handGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    // const handMaterial = new THREE.MeshPhongMaterial({ color: 0x87cefa });
  
    // const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    // leftHand.position.set(-1, 0.1, 0);
    // robot.add(leftHand);
  
    // const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    // rightHand.position.set(1, 0.1, 0);
    // robot.add(rightHand);
  
    // **6. Floating Hearts & Stars**
    const hearts = [];
    const stars = [];
  
    // Create floating hearts
    for (let i = 0; i < 100; i++) {
      const smallHeart = new THREE.Mesh(
        new THREE.ExtrudeGeometry(heartShape, {
          depth: 0.02,
          bevelEnabled: false
        }),
        new THREE.MeshPhongMaterial({
          color: 0xffb6c1,
          transparent: true,
          opacity: 0.9
        })
      );
      smallHeart.scale.set(0.1, 0.1, 0.1);
      smallHeart.position.set(
        (Math.random() - 0.5) * 6,
        Math.random() * 4,
        (Math.random() - 0.5) * 4 - 2
      );
      scene.add(smallHeart);
      hearts.push(smallHeart);
    }
  
    // Create floating stars
    const starShape = new THREE.Shape();
    starShape.moveTo(0, 0.5);
    for (let i = 1; i <= 100; i++) {
      const angle = (i * Math.PI * 2) / 10;
      const radius = i % 2 === 0 ? 0.2 : 0.5;
      starShape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
    }
    starShape.lineTo(0, 0.5);
  
    for (let i = 0; i < 10; i++) {
      const star = new THREE.Mesh(
        new THREE.ExtrudeGeometry(starShape, {
          depth: 0.02,
          bevelEnabled: false
        }),
        new THREE.MeshPhongMaterial({
          color: 0xffff00,
          emissive: 0xffff00,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.7
        })
      );
      star.scale.set(0.1, 0.1, 0.1);
      star.position.set(
        (Math.random() - 0.5) * 6,
        Math.random() * 4,
        (Math.random() - 0.5) * 4 - 2
      );
      scene.add(star);
      stars.push(star);
    }
  
    // **7. Animation Loop**
    let time = 0;
    const clock = new THREE.Clock();
  
    function animate() {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      time += delta;
  
      // **Robot Animations**
      // 1. Gentle bobbing
      robot.position.y = Math.sin(time) * 0.05;
      
      // 2. Waving arms
      leftArm.rotation.z = Math.sin(time * 2) * 0.3 + 0.5;
      rightArm.rotation.z = Math.sin(time * 2) * -0.3 - 0.5;
      
      // 3. Blinking eyes (occasionally)
      if (Math.sin(time * 0.5) > 0.9) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
      } else {
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
      }
      
      // 4. Heart antenna bounce
      heart.position.y = 2.5 + Math.sin(time * 3) * 0.1;
      
      // 5. Floating hearts and stars
      hearts.forEach((heart, i) => {
        heart.rotation.z += 0.01;
        heart.position.y += Math.sin(time * 0.5 + i) * 0.01;
      });
      
      stars.forEach((star, i) => {
        star.rotation.z += 0.02;
        star.position.x += Math.cos(time * 0.3 + i) * 0.01;
      });
      
      // 6. Camera slight movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.position.z = 5 + Math.cos(time * 0.1) * 0.2;
      camera.lookAt(robot.position);
      
      renderer.render(scene, camera);
    }
  
    // **8. Handle Resize**
    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);
  
    // **9. Interactive Elements**
    container.addEventListener('mousemove', (e) => {
      const x = (e.clientX / container.clientWidth) * 2 - 1;
      const y = -(e.clientY / container.clientHeight) * 2 + 1;
      
      // **Eyes follow cursor**
      leftPupil.position.x = -0.25 + x * 0.1;
      leftPupil.position.y = 1.55 + y * 0.05;
      rightPupil.position.x = 0.25 + x * 0.1;
      rightPupil.position.y = 1.55 + y * 0.05;
      
      // **Cheeks blush more when mouse is near**
      cheekMaterial.opacity = 0.7 + (Math.abs(x) + Math.abs(y)) * 0.2;
      
      // **Head tilts slightly**
      head.rotation.z = x * -0.1;
      head.rotation.x = y * 0.05;
    });
  
    // **Click for a happy animation!**
    container.addEventListener('click', () => {
      // Make the robot jump for joy!
      gsap.to(robot.position, {
        y: 0.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
      // Hearts explode from the robot
      for (let i = 0; i < 10; i++) {
        const burstHeart = new THREE.Mesh(
          new THREE.ExtrudeGeometry(heartShape, {
            depth: 0.02,
            bevelEnabled: false
          }),
          new THREE.MeshPhongMaterial({
            color: 0xff69b4, // Pink color
            transparent: true,
            opacity: 1
          })
        );
        burstHeart.scale.set(0.15, 0.15, 0.15);
        burstHeart.position.copy(robot.position);
        burstHeart.position.y += 1;
        scene.add(burstHeart);
        
        // Animate heart burst
        gsap.to(burstHeart.position, {
          x: (Math.random() - 0.5) * 3,
          y: Math.random() * 3,
          z: (Math.random() - 0.5) * 3,
          duration: 1.5,
          ease: "power2.out"
        });
        gsap.to(burstHeart.material, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => scene.remove(burstHeart)
        });
      }
    });
  
    // **Start animation**
    handleResize();
    animate();
  }