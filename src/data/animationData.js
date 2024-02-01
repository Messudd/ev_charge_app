
export const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 2,
      },
    },
  };
  
export const moveForm = {
    hidden: {
      opacity: 0,
      rotate:0,
      x: -1200,
      y:-1200
    },
    visible: {
      opacity: 1,
      x: 0,
      y:0,
      rotate:360
    },
  };
  
 export  const moveBtn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };