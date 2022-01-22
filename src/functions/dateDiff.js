import React from 'react';

function dateDiff(date) {
  var today = new Date();
  var start = new Date(date);
  const diff = Math.floor((start.getTime() - today.getTime()) / 60000);
  return diff;
}

export default dateDiff;
