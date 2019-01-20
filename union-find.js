class UnionFindWithSet {
  constructor() {
    this.sets = new Set();
  }

  union(c1, c2) {
    var set1 = null;
    var set2 = null;
    this.sets.forEach(set => {

      if (set.has(c1)){
        set1 = set;
      } else if (set.has(c2)){
        set2 = set;
      }
    });

    if (!set1) {
      set1 = new Set([c1]);
    }

    if (!set2) {
      set2 = new Set([c2]);
    }

    this.merge(set1, set2);
  }


  merge(set1, set2) {
    set2.forEach(ent => set1.add(ent));
    this.sets.add(set1);
    this.sets.delete(set2);
  }

  /**
   * @returns {Boolean} - are the two components connected?
   */
  connected(c1, c2) {
    let connected = false;
    this.sets.forEach(set => {
      if (set.has(c1) && set.has(c2)) {
        connected = true;
      }
    });
    return connected;
  }
}


 // iterate over a set of numbers [0, 1]
 // check if each number is part of a set.
 // if they both are in a set, merge the sets
 // if one is in a set, add the other one to the 


 // when dealing with values that aren't numbers, store mapping of index number to name / real value

class UnionFind {

  constructor(){
    this.components = [];
  }

  componentIsRoot(val) {
    return this.components[val] === val;
  }

  soloComponent (val) {
    return this.components[val] === undefined;
  }

  getRoot(val, depth = 0) {
    if (this.soloComponent(val)) {
      this.components[val] = val;
      return [val, 0];
    }

    if (this.componentIsRoot(val)) {
      return [val, depth];
    }

    return this.getRoot(this.components[val], depth + 1);
  }

  union(val1, val2) {
    const [root1, depth1] = this.getRoot(val1);
    const [root2, depth2] = this.getRoot(val2);

    // make root of taller tree the root for shorter tree
    if (depth1 < depth2) {
      this.components[root1] = root2;
    } else {
      this.components[root2] = root1;
    }
  }

  connected(val1, val2) {
    return this.getRoot(val1)[0] === this.getRoot(val2)[0];
  }


}

const uf = new UnionFind();

uf.union(1, 2)
uf.union(3, 4) 
uf.union(5, 6)
uf.union(7, 8)
uf.union(7, 9)
uf.union(2, 8)
uf.union(0, 5)


console.log(uf.connected(0, 6)) // true

console.log(uf.connected(2, 7)) // true

console.log(uf.connected(0, 1)) // false
