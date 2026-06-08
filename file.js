class TaskScheduler {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

 
  sortByStartTime() {
    
    return [...this.tasks].sort((a, b) => a.start - b.start);
  }

  
  groupByPriority() {
    const groups = new Map();

    for (let task of this.tasks) {
      if (!groups.has(task.priority)) {
        groups.set(task.priority, []);
      }
      groups.get(task.priority).push(task);
    }

    return groups;
  }

  detectOverlaps() {
    const sorted = this.sortByStartTime();
    const overlaps = [];

    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];

      // overlap si le début du suivant est avant la fin du courant
      if (current.end > next.start) {
        overlaps.push({
          task1: current,
          task2: next
        });
      }
    }

    return overlaps;
  }

 
  estimateMemoryUsage() {
    
    const bytesPerTask = 200; // estimation simplifiée
    return this.tasks.length * bytesPerTask;
  }
}

const tasks = [
  { name: "A", start: 9, end: 11, priority: "High" },
  { name: "B", start: 10, end: 12, priority: "Low" },
  { name: "C", start: 13, end: 15, priority: "Medium" },
  { name: "D", start: 11, end: 14, priority: "High" }
];

const scheduler = new TaskScheduler(tasks);


console.log("Sorted Tasks:");
console.log(scheduler.sortByStartTime());


console.log("\nGrouped by Priority:");
console.log(scheduler.groupByPriority());

console.log("\nOverlapping Tasks:");
console.log(scheduler.detectOverlaps());


console.log("\nMemory Estimation:");
console.log(scheduler.estimateMemoryUsage(), "bytes");