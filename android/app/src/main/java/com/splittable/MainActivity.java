package com.splittable;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
// add new
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   // new add
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
    super.onCreate(null);
    }

    //end adding...

  @Override
  protected String getMainComponentName() {
    return "SplitTable";
  }
  
}
