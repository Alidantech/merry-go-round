class User {
  constructor(id, phone, idNumber, fname, lname, gender, dob, avatar) {
    // Validate required fields
    if (!phone || !idNumber) {
      throw new Error("Missing required fields");
    }

    this.id = id;
    this.phone = phone;
    this.idNumber = idNumber;
    this.fname = fname;
    this.lname = lname;
    this.gender = gender;
    this.dob = dob;
    this.avatar = avatar;
    this.timestamps = {
      createdAt: new Date(),
      updatedAt: null,
    };
    this.groups = [];
  }

  // Method to add a group to the user
  addGroup(groupId, role) {
    this.groups.push({ groupId, role });
  }
}
