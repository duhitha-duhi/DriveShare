import React, { useEffect, useRef, useState } from "react";

function CarShowcase() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isRotating, setIsRotating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startAngle: 0,
    velocity: 0,
  });

  const imagesRef = useRef(new Map());

  const frames = [
    {
      angle: 0,
      src: "/images/car/car-front.jpg",
      flip: false,
    },
    {
      angle: 45,
      src: "/images/car/car-front-right.jpg",
      flip: false,
    },
    {
      angle: 90,
      src: "/images/car/car-right.jpg",
      flip: false,
    },
    {
      angle: 135,
      src: "/images/car/car-rear-right.jpg",
      flip: false,
    },
    {
      angle: 180,
      src: "/images/car/car-rear.jpg",
      flip: false,
    },
    {
      angle: 225,
      src: "/images/car/car-rear-right.jpg",
      flip: true,
    },
    {
      angle: 270,
      src: "/images/car/car-right.jpg",
      flip: true,
    },
    {
      angle: 315,
      src: "/images/car/car-front-right.jpg",
      flip: true,
    },
  ];

  /* =====================================
     LOAD IMAGES
  ===================================== */

  useEffect(() => {
    const uniqueImages = [
      ...new Set(frames.map((frame) => frame.src)),
    ];

    let loaded = 0;

    uniqueImages.forEach((src) => {
      const img = new Image();

      img.src = src;

      img.onload = () => {
        imagesRef.current.set(src, img);

        loaded++;

        if (loaded === uniqueImages.length) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        console.log("Car image not found:", src);
      };
    });
  }, []);


  /* =====================================
     CANVAS SIZE
  ===================================== */

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;

      if (!canvas || !wrapper) return;

      const rect = wrapper.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);


  /* =====================================
     DRAW CAR
  ===================================== */

  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta =
        (time - lastTime) / 1000;

      lastTime = time;

      setCurrentAngle((previous) => {

        let nextAngle = previous;

        /* PRESET MOVEMENT */

        if (targetAngle !== null) {

          let difference =
            targetAngle - previous;

          while (difference < -180) {
            difference += 360;
          }

          while (difference > 180) {
            difference -= 360;
          }

          if (Math.abs(difference) < 0.5) {
            setTargetAngle(null);
            return targetAngle;
          }

          nextAngle =
            previous +
            difference *
              Math.min(delta * 8, 1);

          return (nextAngle + 360) % 360;
        }


        /* AUTO ROTATION */

        if (
          isRotating &&
          !dragRef.current.dragging
        ) {

          nextAngle =
            previous +
            22.5 *
              speed *
              delta;

          return nextAngle % 360;
        }


        /* INERTIA */

        if (
          !dragRef.current.dragging &&
          Math.abs(
            dragRef.current.velocity
          ) > 0.1
        ) {

          nextAngle =
            previous +
            dragRef.current.velocity;

          dragRef.current.velocity *= 0.92;

          return (nextAngle + 360) % 360;
        }

        return previous;
      });


      drawCar();

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };

  }, [
    isRotating,
    speed,
    targetAngle,
    imagesLoaded,
    darkMode,
  ]);


  /* =====================================
     DRAW CAR IMAGE
  ===================================== */

  const drawCar = () => {

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");

    const rect =
      wrapper.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /* GROUND SHADOW */

    const shadowGradient =
      ctx.createRadialGradient(
        width / 2,
        height * 0.76,
        10,
        width / 2,
        height * 0.76,
        width * 0.35
      );

    const shadow =
      darkMode
        ? 0.6
        : 0.25;

    shadowGradient.addColorStop(
      0,
      `rgba(0,0,0,${shadow})`
    );

    shadowGradient.addColorStop(
      0.4,
      `rgba(0,0,0,${shadow * 0.6})`
    );

    shadowGradient.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
      shadowGradient;

    ctx.beginPath();

    ctx.ellipse(
      width / 2,
      height * 0.76,
      width * 0.35,
      22,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();


    /* NORMALIZE ANGLE */

    let angle =
      currentAngle % 360;

    if (angle < 0) {
      angle += 360;
    }


    /* FRAME CALCULATION */

    const step = 45;

    const indexA =
      Math.floor(angle / step) %
      frames.length;

    const indexB =
      (indexA + 1) %
      frames.length;

    const frameA =
      frames[indexA];

    const frameB =
      frames[indexB];

    const blend =
      (angle % step) / step;

    const imgA =
      imagesRef.current.get(
        frameA.src
      );

    const imgB =
      imagesRef.current.get(
        frameB.src
      );


    if (!imgA) {

      ctx.fillStyle =
        darkMode
          ? "#94a3b8"
          : "#64748b";

      ctx.font =
        "600 14px Arial";

      ctx.textAlign =
        "center";

      ctx.fillText(
        "Loading vehicle...",
        width / 2,
        height / 2
      );

      return;
    }


    /* DRAW FIRST IMAGE */

    drawImage(
      ctx,
      imgA,
      frameA.flip,
      width,
      height,
      1 - blend * 0.45
    );


    /* DRAW SECOND IMAGE */

    if (
      imgB &&
      blend > 0.05
    ) {

      drawImage(
        ctx,
        imgB,
        frameB.flip,
        width,
        height,
        blend * 0.65
      );
    }
  };


  /* =====================================
     IMAGE DRAW FUNCTION
  ===================================== */

  const drawImage = (
    ctx,
    img,
    flip,
    stageWidth,
    stageHeight,
    opacity
  ) => {

    const aspect =
      img.naturalWidth /
      img.naturalHeight;

    let drawWidth =
      stageWidth * 0.88;

    let drawHeight =
      drawWidth / aspect;

    if (
      drawHeight >
      stageHeight * 0.78
    ) {

      drawHeight =
        stageHeight * 0.78;

      drawWidth =
        drawHeight * aspect;
    }

    const x =
      (stageWidth - drawWidth) / 2;

    const y =
      (stageHeight - drawHeight) / 2 -
      10;

    ctx.save();

    ctx.globalAlpha =
      opacity;

    if (flip) {

      ctx.translate(
        stageWidth,
        0
      );

      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      img,
      x,
      y,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  };


  /* =====================================
     DRAG START
  ===================================== */

  const handlePointerDown = (e) => {

    dragRef.current.dragging =
      true;

    dragRef.current.startX =
      e.clientX;

    dragRef.current.startAngle =
      currentAngle;

    dragRef.current.velocity = 0;

    setTargetAngle(null);
  };


  /* =====================================
     DRAG MOVE
  ===================================== */

  const handlePointerMove = (e) => {

    if (
      !dragRef.current.dragging
    ) {
      return;
    }

    const deltaX =
      e.clientX -
      dragRef.current.startX;

    const angleDelta =
      (deltaX / 400) * 360;

    const previous =
      currentAngle;

    let next =
      dragRef.current.startAngle -
      angleDelta;

    next =
      (next + 3600) % 360;

    dragRef.current.velocity =
      next - previous;

    setCurrentAngle(next);
  };


  /* =====================================
     DRAG END
  ===================================== */

  const handlePointerUp = () => {

    dragRef.current.dragging =
      false;
  };


  /* =====================================
     PRESET
  ===================================== */

  const jumpToAngle = (angle) => {

    setTargetAngle(angle);

    setIsRotating(false);
  };


  /* =====================================
     THEME
  ===================================== */

  const toggleTheme = () => {

    setDarkMode(
      (previous) => !previous
    );
  };


  /* =====================================
     BOOK BUTTON
  ===================================== */

  const handleBooking = () => {

    window.location.href =
      "/book";
  };


  return (

    <div
      className={`car-showcase ${
        darkMode
          ? "car-showcase-dark"
          : ""
      }`}
    >

      {/* ===============================
          TOP MINI HEADER
      =============================== */}

      <div className="car-showcase-header">

        <div className="fleet-brand">

          <div className="fleet-logo">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >

              <path
                d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.9 2 11v5c0 .6.4 1 1 1h2"
              />

              <circle
                cx="7"
                cy="17"
                r="2"
              />

              <circle
                cx="17"
                cy="17"
                r="2"
              />

            </svg>

          </div>

          <div>

            <strong>
              DriveShare Fleet
            </strong>

            <span>
              Executive Chauffeur & Driver Requests
            </span>

          </div>

        </div>


        <div className="fleet-actions">

          <div className="vehicle-status">

            <span></span>

            Vehicle Available

          </div>

          <button
            className="fleet-theme-button"
            onClick={toggleTheme}
          >

            {darkMode
              ? "☀"
              : "☾"}

          </button>

        </div>

      </div>


      {/* ===============================
          SHOWCASE
      =============================== */}

      <div className="car-showcase-grid">


        {/* LEFT CAR AREA */}

        <section className="car-stage">

          <div className="stage-background"></div>


          <div
            ref={wrapperRef}
            className="car-canvas-wrapper"

            onPointerDown={
              handlePointerDown
            }

            onPointerMove={
              handlePointerMove
            }

            onPointerUp={
              handlePointerUp
            }

            onPointerCancel={
              handlePointerUp
            }

            onPointerLeave={
              handlePointerUp
            }
          >

            <canvas
              ref={canvasRef}
              className="car-canvas"
            />


            <div className="turntable-ring"></div>


            <div className="car-drag-hint">

              ↔ Drag left or right to
              inspect 360° angles

            </div>

          </div>


          {/* CONTROLS */}

          <div className="car-controls">


            <button
              className="rotation-button"
              onClick={() =>
                setIsRotating(
                  (previous) =>
                    !previous
                )
              }
            >

              {isRotating
                ? "Ⅱ Stop Rotation"
                : "▶ Start Rotation"}

            </button>


            <div className="angle-buttons">

              {[
                [0, "Front"],
                [45, "3/4 View"],
                [90, "Side Profile"],
                [180, "Rear"],
                [270, "Other Side"],
              ].map(
                ([angle, label]) => (

                  <button
                    key={angle}

                    className={
                      Math.abs(
                        currentAngle -
                          angle
                      ) < 22.5
                        ? "active"
                        : ""
                    }

                    onClick={() =>
                      jumpToAngle(angle)
                    }
                  >

                    {label}

                  </button>

                )
              )}

            </div>


            <div className="speed-buttons">

              <span>
                Speed:
              </span>

              {[

                [0.5, "Slow"],
                [1, "Normal"],
                [2, "Fast"],

              ].map(
                ([value, label]) => (

                  <button
                    key={value}

                    className={
                      speed === value
                        ? "active"
                        : ""
                    }

                    onClick={() =>
                      setSpeed(value)
                    }
                  >

                    {label}

                  </button>

                )
              )}

            </div>

          </div>

        </section>


        {/* ===============================
            VEHICLE INFO
        =============================== */}

        <aside className="vehicle-info-card">

          <div className="vehicle-badge">

            EXECUTIVE COMFORT CLASS

          </div>


          <h2>
            Mercedes-Benz E-Class
          </h2>


          <p className="vehicle-description">

            Premium Chauffeur &
            Daily Driver Fleet

          </p>


          <div className="vehicle-price">

            <strong>
              ₹1,500
            </strong>

            <span>
              / day
            </span>

          </div>


          <div className="vehicle-specs">


            <div>

              <span className="spec-symbol">
                👥
              </span>

              <div>

                <strong>
                  Passengers
                </strong>

                <small>
                  Up to 4 Adults
                </small>

              </div>

            </div>


            <div>

              <span className="spec-symbol">
                🧳
              </span>

              <div>

                <strong>
                  Luggage Capacity
                </strong>

                <small>
                  3 Full Suitcases
                </small>

              </div>

            </div>


            <div>

              <span className="spec-symbol">
                📶
              </span>

              <div>

                <strong>
                  Complimentary WiFi
                </strong>

                <small>
                  High-speed 5G
                </small>

              </div>

            </div>


            <div>

              <span className="spec-symbol">
                🕒
              </span>

              <div>

                <strong>
                  Chauffeur Service
                </strong>

                <small>
                  Professional Driver
                </small>

              </div>

            </div>

          </div>


          <button
            className="vehicle-book-button"
            onClick={handleBooking}
          >

            Book This Vehicle Now

            <span>
              →
            </span>

          </button>


          <div className="vehicle-note">

            <strong>
              360° Vehicle Preview
            </strong>

            <p>
              Drag the car left or right
              to inspect different angles.
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default CarShowcase;