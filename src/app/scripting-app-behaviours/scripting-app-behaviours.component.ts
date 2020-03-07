import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-scripting-app-behaviours',
    templateUrl: './scripting-app-behaviours.component.html',
    styleUrls: ['./scripting-app-behaviours.component.css'],
})
export class ScriptingAppBehavioursComponent implements OnInit {
    appBehaviourSource = `using UnityEngine;
public class AppBehaviour : MonoBehaviour {
  public virtual void Start(){
    // Initialisation is done here...
  }
}`;

    appBehaviour = `// MyAppScript.cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyAppScript : AppBehaviour
{
  // Start is called before the first frame update.
  public override void Start() {

    // Your code here...

    // Call base.Start() to initialise the underlying AppBehaviour. Without this
    // some things might not work as expected, such as interactables.
    base.Start();
  }

  // Update is called once per frame
  void Update()
  {

  }
}`;
    appBehaviourAddComponent = `// MyAppScript.cs
using UnityEngine;
public class MyAppScript : AppBehaviour {
  // Use this for initialization
  public override void Start() {
    MyOtherScript component = transform.Find("ChildGameObject/AnotherChild").gameObject.AddComponent<MyOtherScript>();
    component.rootTransform = transform;
    base.Start();
  }
  // Update is called once per frame
  void Update () {

  }
}`;
    appBehaviourAddComponentOther = `// MyOtherScript.cs
using UnityEngine;
public class MyOtherScript : MonoBehaviour {
  public Transform rootTransform;
  // Use this for initialization
  void Start () {
    Debug.Log(rootTransform.position);
    // Logs the position of the root of your app
  }
  // Update is called once per frame
  void Update () {

  }
}`;
    constructor(public appService: AppService) {}

    ngOnInit() {}
}
